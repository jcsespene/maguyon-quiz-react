/**
 * SRS (Spaced Repetition) + IRT (Item Response Theory) type definitions
 *
 * These types power the adaptive question selection engine.
 * All data is persisted client-side in localStorage under `adaptiveState_{userId}`.
 */

/** Stable question identifier — positional index from the pool array */
export type QuestionId = string; // "q_0"–"q_191" regular, "b_0"–"b_9" bonus

/** Single attempt record for a question */
export interface QuestionAttempt {
  timestamp: number;      // Date.now()
  correct: boolean;
  sessionNumber: number;
}

/** Per-question accumulated state (SRS scheduling + IRT difficulty) */
export interface QuestionState {
  id: QuestionId;
  attempts: QuestionAttempt[];  // capped at most recent 10
  consecutiveCorrect: number;   // current streak
  consecutiveWrong: number;     // current streak
  lastSeen: number | null;      // timestamp of last attempt
  nextEligibleSession: number;  // session number when SRS allows this back
  // IRT fields
  difficulty: number;           // b parameter (Rasch), calibrated over time
}

/** Student ability model */
export interface StudentModel {
  theta: number;                // current ability estimate, starts at 0
  thetaHistory: Array<{         // capped at last 20 entries
    session: number;
    theta: number;
    timestamp: number;
  }>;
  totalSessions: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
}

/** Root persisted object — one per user in localStorage */
export interface AdaptiveState {
  version: 1;
  student: StudentModel;
  questions: Record<QuestionId, QuestionState>;  // sparse: only questions seen at least once
  lastSessionNumber: number;
}

/** Weighted selection data for a candidate question */
export interface CandidateScore {
  questionIndex: number;
  questionId: QuestionId;
  srsWeight: number;      // 0–1
  irtWeight: number;      // 0–1
  combinedWeight: number;  // blended final weight
}

/** Summary for the mastery display on StartScreen */
export interface MasterySummary {
  overallMastery: number;       // 0–100 percentage
  questionsAttempted: number;
  questionsMastered: number;    // consecutiveCorrect >= 3
  estimatedAbility: number;     // theta
  abilityLabel: string;         // "Beginner" | "Developing" | "Proficient" | "Advanced"
  sessionsCompleted: number;
}

/** Default factory for a fresh AdaptiveState */
export function createDefaultAdaptiveState(): AdaptiveState {
  return {
    version: 1,
    student: {
      theta: 0,
      thetaHistory: [],
      totalSessions: 0,
      totalQuestionsAnswered: 0,
      totalCorrect: 0,
    },
    questions: {},
    lastSessionNumber: 0,
  };
}
