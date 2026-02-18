/**
 * SRS (Spaced Repetition System) hook.
 *
 * Manages the AdaptiveState in localStorage and provides:
 *  - SRS weight computation for question selection
 *  - Session result recording (updates question states, theta, difficulty)
 *  - State reset
 *
 * Interval table (Anki-inspired):
 *   consecutiveCorrect = 0  → nextSession = current + 1
 *   consecutiveCorrect = 1  → nextSession = current + 2
 *   consecutiveCorrect = 2  → nextSession = current + 4
 *   consecutiveCorrect = 3  → nextSession = current + 8
 *   consecutiveCorrect >= 4 → nextSession = current + 15
 */

import { useState, useCallback, useEffect } from 'react';
import type {
  AdaptiveState,
  QuestionState,
  QuestionAttempt,
  QuestionId,
  MasterySummary,
} from '@/types/srs';
import { createDefaultAdaptiveState } from '@/types/srs';
import { getInitialDifficulty } from '@/data/questionMeta';
import { parseQuestionId } from '@/data/questionMeta';
import { updateTheta, calibrateDifficulty, getMasterySummary } from './useIRT';

// ── Constants ──────────────────────────────────────────────────

const STORAGE_PREFIX = 'adaptiveState_';
const MAX_ATTEMPTS_PER_QUESTION = 10;
const MAX_THETA_HISTORY = 20;

// ── SRS Interval Calculation ───────────────────────────────────

const INTERVAL_TABLE = [1, 2, 4, 8, 15]; // indexed by consecutiveCorrect (capped at 4)

function calculateNextEligibleSession(
  currentSession: number,
  consecutiveCorrect: number
): number {
  const idx = Math.min(consecutiveCorrect, INTERVAL_TABLE.length - 1);
  return currentSession + INTERVAL_TABLE[idx];
}

// ── SRS Weight for Question Selection ──────────────────────────

/**
 * Returns a 0–1 weight indicating how urgently this question needs review.
 *   - Never seen:        0.6 (moderate — should see new material)
 *   - Last attempt wrong: 0.9 (high priority)
 *   - Overdue per SRS:   1.0 (ready for review)
 *   - Not yet due:       0.1 (low priority, let SRS spacing work)
 */
export function getSRSWeight(
  questionState: QuestionState | undefined,
  currentSession: number
): number {
  // Never seen this question
  if (!questionState) return 0.6;

  // Last attempt was wrong → high priority
  if (questionState.consecutiveWrong > 0) return 0.9;

  // Overdue: current session has passed the SRS scheduled return
  if (currentSession >= questionState.nextEligibleSession) return 1.0;

  // Not yet due
  return 0.1;
}

// ── Persistence ────────────────────────────────────────────────

function loadState(userId: string): AdaptiveState {
  const key = `${STORAGE_PREFIX}${userId}`;
  const raw = localStorage.getItem(key);

  if (!raw) return createDefaultAdaptiveState();

  try {
    const parsed = JSON.parse(raw) as AdaptiveState;
    // Future: if parsed.version < CURRENT, run migration
    return parsed;
  } catch {
    return createDefaultAdaptiveState();
  }
}

function saveState(userId: string, state: AdaptiveState): void {
  const key = `${STORAGE_PREFIX}${userId}`;
  localStorage.setItem(key, JSON.stringify(state));
}

function clearState(userId: string): void {
  const key = `${STORAGE_PREFIX}${userId}`;
  localStorage.removeItem(key);
}

// ── Question State Update ──────────────────────────────────────

function updateQuestionAfterAttempt(
  existing: QuestionState | undefined,
  questionId: QuestionId,
  correct: boolean,
  sessionNumber: number
): QuestionState {
  const { index, isBonus } = parseQuestionId(questionId);
  const initialDifficulty = getInitialDifficulty(index, isBonus);

  const base: QuestionState = existing ?? {
    id: questionId,
    attempts: [],
    consecutiveCorrect: 0,
    consecutiveWrong: 0,
    lastSeen: null,
    nextEligibleSession: 0,
    difficulty: initialDifficulty,
  };

  const newAttempt: QuestionAttempt = {
    timestamp: Date.now(),
    correct,
    sessionNumber,
  };

  // Cap attempts at MAX
  const updatedAttempts = [...base.attempts, newAttempt].slice(-MAX_ATTEMPTS_PER_QUESTION);

  // Update streaks
  const consecutiveCorrect = correct ? base.consecutiveCorrect + 1 : 0;
  const consecutiveWrong = correct ? 0 : base.consecutiveWrong + 1;

  // Calculate next eligible session
  const nextEligibleSession = correct
    ? calculateNextEligibleSession(sessionNumber, consecutiveCorrect)
    : sessionNumber + 1; // wrong → come back next session

  return {
    id: questionId,
    attempts: updatedAttempts,
    consecutiveCorrect,
    consecutiveWrong,
    lastSeen: Date.now(),
    nextEligibleSession,
    difficulty: base.difficulty, // calibrated separately below
  };
}

// ── Hook ───────────────────────────────────────────────────────

export interface SessionResultInput {
  questionId: QuestionId;
  correct: boolean;
}

export function useSRS(userId: string) {
  const [adaptiveState, setAdaptiveState] = useState<AdaptiveState>(
    () => loadState(userId)
  );
  const [currentUserId, setCurrentUserId] = useState(userId);

  // Reload when userId changes
  useEffect(() => {
    if (userId !== currentUserId) {
      setAdaptiveState(loadState(userId));
      setCurrentUserId(userId);
    }
  }, [userId, currentUserId]);

  // Save whenever state changes
  useEffect(() => {
    saveState(currentUserId, adaptiveState);
  }, [adaptiveState, currentUserId]);

  /**
   * Record results from a completed quiz session.
   * Updates: question states, SRS scheduling, theta, difficulty calibration.
   */
  const recordSessionResults = useCallback((results: SessionResultInput[]) => {
    setAdaptiveState(prev => {
      const nextSession = prev.lastSessionNumber + 1;
      const newQuestions = { ...prev.questions };

      // 1) Update each question's state
      for (const r of results) {
        const existing = newQuestions[r.questionId];
        newQuestions[r.questionId] = updateQuestionAfterAttempt(
          existing,
          r.questionId,
          r.correct,
          nextSession
        );
      }

      // 2) Update theta using IRT
      const sessionForTheta = results.map(r => ({
        difficulty: newQuestions[r.questionId].difficulty,
        correct: r.correct,
      }));
      const newTheta = updateTheta(prev.student.theta, sessionForTheta);

      // 3) Calibrate difficulty for questions with enough data
      for (const r of results) {
        const qs = newQuestions[r.questionId];
        if (qs.attempts.length >= 5) {
          newQuestions[r.questionId] = {
            ...qs,
            difficulty: calibrateDifficulty(qs, newTheta),
          };
        }
      }

      // 4) Update student model
      const correctCount = results.filter(r => r.correct).length;
      const thetaEntry = {
        session: nextSession,
        theta: newTheta,
        timestamp: Date.now(),
      };
      const thetaHistory = [
        ...prev.student.thetaHistory,
        thetaEntry,
      ].slice(-MAX_THETA_HISTORY);

      return {
        ...prev,
        version: 1 as const,
        student: {
          theta: newTheta,
          thetaHistory,
          totalSessions: prev.student.totalSessions + 1,
          totalQuestionsAnswered: prev.student.totalQuestionsAnswered + results.length,
          totalCorrect: prev.student.totalCorrect + correctCount,
        },
        questions: newQuestions,
        lastSessionNumber: nextSession,
      };
    });
  }, []);

  /** Reset all adaptive data for this user */
  const resetAdaptiveState = useCallback(() => {
    const fresh = createDefaultAdaptiveState();
    setAdaptiveState(fresh);
    clearState(currentUserId);
  }, [currentUserId]);

  /** Compute mastery summary (null if < 3 sessions) */
  const mastery: MasterySummary | null = getMasterySummary(adaptiveState);

  return {
    adaptiveState,
    recordSessionResults,
    resetAdaptiveState,
    mastery,
  };
}
