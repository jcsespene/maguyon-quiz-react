export type QuestionType =
  | 'multiple-choice'
  | 'true-false'
  | 'fill-blank'
  | 'fill-blank-inline'
  | 'arrangement'
  | 'statement-ab';

export interface BaseQuestion {
  type: QuestionType;
  explanation?: string;
  needsCalculator?: boolean;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  question: string;
  options: string[];
  correct: number;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  // Question with _word_ syntax to mark the underlined word
  // e.g., "The capital of France is _Berlin_."
  question: string;
  // The correct word (what the underlined word should be)
  // If the underlined word is already correct, this should match it
  // User types "!" if correct, or types the correct word if wrong
  correctWord: string;
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill-blank';
  question: string;
  correct: string[];
}

export interface FillBlankInlineQuestion extends BaseQuestion {
  type: 'fill-blank-inline';
  // Text with blanks marked as {{blank}} or {{blank:options}}
  // e.g. "Roses are {{blank}}, violets are {{blank:purple,violet,blue}}, grass is {{blank}}."
  template: string;
  // Word bank options (for drag/click selection)
  wordBank: string[];
  // Correct answers in order of blanks
  correct: string[];
}

export interface ArrangementQuestion extends BaseQuestion {
  type: 'arrangement';
  question: string;
  items: string[];
  correct: number[];
}

export interface StatementQuestion extends BaseQuestion {
  type: 'statement-ab';
  // Array of statements (supports 2 or more)
  statements: string[];
  // Array of statement numbers that are correct (1-indexed)
  // e.g., [1, 3] means statements 1 and 3 are correct
  // Empty array [] means none are correct
  correct: number[];
}

export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | FillBlankQuestion
  | FillBlankInlineQuestion
  | ArrangementQuestion
  | StatementQuestion;

export type Answer = number | string | boolean | number[] | string[] | null;

// Helper to extract the underlined word from a question
export function extractUnderlinedWord(question: string): string | null {
  const match = question.match(/_([^_]+)_/);
  return match ? match[1] : null;
}

export interface QuizProgress {
  bestScore: number | null;
  totalAttempts: number;
  lastAttempt: string | null;
}

export interface QuizConfig {
  questionsPerRound: number;
  timeLimitMinutes: number;
  requiredScoreToUnlock: number;
  totalRounds: number;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
}

export interface QuizResult {
  question: string;
  questionId?: string;    // stable ID for SRS/IRT tracking (e.g. "q_42", "b_3")
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation?: string;
  isBonus?: boolean;
  points: number;
}

export interface QuizResults {
  correct: number;
  total: number;
  points: number;
  totalPoints: number;
  timeElapsed: number; // seconds
  details: QuizResult[];
}

export type Screen = 'start' | 'quiz' | 'results';

export interface ShuffledOption {
  text: string;
  originalIndex: number;
}
