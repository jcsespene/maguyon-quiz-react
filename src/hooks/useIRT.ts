/**
 * IRT (Item Response Theory) computation module.
 *
 * Implements a simplified 1-parameter Rasch model:
 *   P(correct) = 1 / (1 + e^-(θ - b))
 *
 * Pure math — no side effects, no React hooks, no persistence.
 * All functions are stateless and can be called from anywhere.
 */

import type { AdaptiveState, QuestionState, MasterySummary } from '@/types/srs';
import { REGULAR_COUNT } from '@/data/questionMeta';

// ── Core Rasch Model ───────────────────────────────────────────

/** Probability of correct response given ability θ and item difficulty b */
export function raschProbability(theta: number, difficulty: number): number {
  return 1 / (1 + Math.exp(-(theta - difficulty)));
}

/** Fisher information: how much a question tells us about ability at this level.
 *  Maximum = 0.25 when P = 0.5 (θ = b). */
export function fisherInformation(theta: number, difficulty: number): number {
  const p = raschProbability(theta, difficulty);
  return p * (1 - p);
}

// ── Theta (Ability) Update ─────────────────────────────────────

interface SessionResult {
  difficulty: number;
  correct: boolean;
}

/**
 * Update student ability estimate after a quiz session using a single
 * Newton-Raphson step on the log-likelihood.
 *
 * θ_new = θ_old + learningRate * Σ(correct_i - P_i) / Σ(I_i)
 *
 * Clamped to [-3, 3] to prevent extreme values.
 */
export function updateTheta(currentTheta: number, results: SessionResult[]): number {
  if (results.length === 0) return currentTheta;

  const LEARNING_RATE = 0.5; // dampener for stability
  const THETA_MIN = -3;
  const THETA_MAX = 3;

  let numerator = 0; // Σ(correct_i - P_i)
  let denominator = 0; // Σ(I_i)

  for (const r of results) {
    const p = raschProbability(currentTheta, r.difficulty);
    const info = p * (1 - p);
    numerator += (r.correct ? 1 : 0) - p;
    denominator += info;
  }

  // Guard against division by zero (all questions trivially easy or hard)
  if (denominator < 0.001) return currentTheta;

  const step = LEARNING_RATE * (numerator / denominator);
  const newTheta = currentTheta + step;

  return Math.max(THETA_MIN, Math.min(THETA_MAX, newTheta));
}

// ── Difficulty Calibration ─────────────────────────────────────

/**
 * Recalibrate a question's difficulty estimate based on observed performance.
 * Only runs after 5+ attempts to avoid noisy early updates.
 *
 * b_new = b_old + learningRate * (expectedCorrectRate - observedCorrectRate)
 * (Positive adjustment = harder than expected, negative = easier)
 */
export function calibrateDifficulty(
  questionState: QuestionState,
  theta: number
): number {
  const MIN_ATTEMPTS_TO_CALIBRATE = 5;

  if (questionState.attempts.length < MIN_ATTEMPTS_TO_CALIBRATE) {
    return questionState.difficulty;
  }

  const LEARNING_RATE = 0.3;
  const DIFFICULTY_MIN = -2;
  const DIFFICULTY_MAX = 2;

  const correctCount = questionState.attempts.filter(a => a.correct).length;
  const observedRate = correctCount / questionState.attempts.length;
  const expectedRate = raschProbability(theta, questionState.difficulty);

  // If student gets it right more than expected, question is easier → decrease b
  // If student gets it wrong more than expected, question is harder → increase b
  const adjustment = LEARNING_RATE * (expectedRate - observedRate);
  const newDifficulty = questionState.difficulty + adjustment;

  return Math.max(DIFFICULTY_MIN, Math.min(DIFFICULTY_MAX, newDifficulty));
}

// ── IRT Selection Weight ───────────────────────────────────────

/**
 * Returns a 0–1 weight indicating how informative this question is
 * for the current student ability level.
 * 1.0 = question perfectly at ability frontier (P ≈ 0.5)
 * 0.0 = question far too easy or too hard (P near 0 or 1)
 */
export function getIRTWeight(theta: number, difficulty: number): number {
  const info = fisherInformation(theta, difficulty);
  // Max Fisher info = 0.25 (when P = 0.5), so normalize to [0, 1]
  return info / 0.25;
}

// ── Mastery Summary ────────────────────────────────────────────

function getAbilityLabel(theta: number): string {
  if (theta < -0.5) return 'Beginner';
  if (theta <= 0.5) return 'Developing';
  if (theta <= 1.5) return 'Proficient';
  return 'Advanced';
}

/**
 * Compute a human-readable mastery summary for the StartScreen.
 * Returns null if fewer than 3 sessions completed.
 */
export function getMasterySummary(state: AdaptiveState): MasterySummary | null {
  if (state.student.totalSessions < 3) return null;

  const questionEntries = Object.values(state.questions);
  const questionsAttempted = questionEntries.length;
  const questionsMastered = questionEntries.filter(
    q => q.consecutiveCorrect >= 3
  ).length;

  // Overall mastery: weighted blend of attempted coverage + mastery rate
  // - 40% weight: what fraction of the pool have you seen?
  // - 60% weight: of what you've seen, how many are mastered?
  const coverageRate = questionsAttempted / REGULAR_COUNT;
  const masteryRate = questionsAttempted > 0
    ? questionsMastered / questionsAttempted
    : 0;
  const overallMastery = Math.round((0.4 * coverageRate + 0.6 * masteryRate) * 100);

  return {
    overallMastery,
    questionsAttempted,
    questionsMastered,
    estimatedAbility: state.student.theta,
    abilityLabel: getAbilityLabel(state.student.theta),
    sessionsCompleted: state.student.totalSessions,
  };
}
