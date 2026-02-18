/**
 * Question metadata: stable ID mapping and initial difficulty estimates.
 *
 * IDs are positional (q_0, q_1, ..., q_191 for regular; b_0, ..., b_9 for bonus).
 * Initial difficulty is a heuristic prior based on question type, calibrated by IRT over time.
 */

import { QUESTION_POOL, BONUS_QUESTIONS } from './questions';
import type { QuestionId } from '@/types/srs';

// ── ID Generation ──────────────────────────────────────────────

export function getQuestionId(index: number, isBonus: boolean): QuestionId {
  return isBonus ? `b_${index}` : `q_${index}`;
}

export function parseQuestionId(id: QuestionId): { index: number; isBonus: boolean } {
  const isBonus = id.startsWith('b_');
  const index = parseInt(id.split('_')[1], 10);
  return { index, isBonus };
}

// ── Pool Size Constants ────────────────────────────────────────

export const REGULAR_COUNT = QUESTION_POOL.length;   // 192
export const BONUS_COUNT = BONUS_QUESTIONS.length;    // 10

// ── Initial Difficulty Estimates ───────────────────────────────
// Scale: -2 (very easy) to +2 (very hard), centered at 0.
// These are rough priors; IRT will calibrate from data after ~5 attempts.

const TYPE_DIFFICULTY_PRIOR: Record<string, number> = {
  'true-false':       -0.3,  // recognition-based
  'fill-blank':        0.3,  // recall-based
  'fill-blank-inline': 0.5,  // multiple blanks
  'multiple-choice':  -0.2,  // options help
  'arrangement':       0.7,  // ordering is complex
  'statement-ab':      0.4,  // subtle distinctions
};

/**
 * Returns a deterministic initial difficulty for a question.
 * Jitter is added based on index so questions of the same type aren't all identical.
 */
export function getInitialDifficulty(index: number, isBonus: boolean): number {
  if (isBonus) return -0.5; // bonus questions are intentionally fun/easy

  const question = QUESTION_POOL[index];
  if (!question) return 0;

  const typePrior = TYPE_DIFFICULTY_PRIOR[question.type] ?? 0;

  // Deterministic jitter: range ≈ [-0.25, +0.20]
  const jitter = ((index * 7) % 10 - 5) * 0.05;

  return Math.max(-2, Math.min(2, typePrior + jitter));
}
