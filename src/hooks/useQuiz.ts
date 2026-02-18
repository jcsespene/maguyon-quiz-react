import { useState, useCallback, useMemo, useRef } from 'react';
import type {
  Question,
  Answer,
  Screen,
  QuizResults,
  QuizResult,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  FillBlankQuestion,
  FillBlankInlineQuestion,
  ArrangementQuestion,
  StatementQuestion,
  ShuffledOption,
} from '@/types/quiz';
import { extractUnderlinedWord } from '@/types/quiz';
import type { QuestionId } from '@/types/srs';
import { QUESTION_POOL, BONUS_QUESTIONS, QUIZ_CONFIG } from '@/data/questions';
import { getQuestionId, getInitialDifficulty } from '@/data/questionMeta';
import { getSRSWeight, useSRS } from './useSRS';
import { getIRTWeight } from './useIRT';
import { useProgress } from './useProgress';
import { useTimer } from './useTimer';

// Extended question type that includes shuffled options for multiple choice
type QuizQuestion = Question & { _shuffledOptions?: ShuffledOption[] };

// Tag for adaptive feedback on results screen
export type QuestionTag = 'new' | 'review' | 'reinforcement';

export interface AdaptiveInfo {
  isAdaptive: boolean;
  questionTags: Map<number, QuestionTag>;
}

export function useQuiz(userId: string = 'guest') {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, Answer>>(new Map());
  const [results, setResults] = useState<QuizResults | null>(null);

  // Map session question index (0–8) → stable QuestionId
  const questionIdMapRef = useRef<Map<number, QuestionId>>(new Map());
  // Tags for adaptive feedback
  const questionTagsRef = useRef<Map<number, QuestionTag>>(new Map());

  // Use a ref to track if we've already submitted
  const hasSubmittedRef = useRef(false);

  const {
    progress,
    updateProgress,
    resetProgress: resetQuizProgress,
  } = useProgress(userId);

  const {
    adaptiveState,
    recordSessionResults,
    resetAdaptiveState,
    mastery,
  } = useSRS(userId);

  // Unified reset: clears both quiz progress and adaptive state
  const resetProgress = useCallback(() => {
    resetQuizProgress();
    resetAdaptiveState();
  }, [resetQuizProgress, resetAdaptiveState]);

  const shuffleOptions = useCallback((question: MultipleChoiceQuestion): QuizQuestion => {
    if (!QUIZ_CONFIG.shuffleOptions) {
      return {
        ...question,
        _shuffledOptions: question.options.map((text, i) => ({ text, originalIndex: i })),
      };
    }

    const shuffledOptions: ShuffledOption[] = question.options
      .map((text, originalIndex) => ({ text, originalIndex }));

    // Fisher-Yates shuffle
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    return {
      ...question,
      _shuffledOptions: shuffledOptions,
    };
  }, []);

  const checkAnswer = useCallback((question: QuizQuestion, userAnswer: Answer): {
    isCorrect: boolean;
    correctAnswer: string;
    userAnswerDisplay: string;
  } => {
    let isCorrect = false;
    let correctAnswer = '';
    let userAnswerDisplay = '';

    switch (question.type) {
      case 'multiple-choice': {
        const q = question as MultipleChoiceQuestion;
        isCorrect = userAnswer === q.correct;
        correctAnswer = q.options[q.correct];
        if (userAnswer !== null && userAnswer !== undefined) {
          userAnswerDisplay = q.options[userAnswer as number] || 'No answer';
        } else {
          userAnswerDisplay = 'No answer';
        }
        break;
      }

      case 'true-false': {
        const q = question as TrueFalseQuestion;
        const underlinedWord = extractUnderlinedWord(q.question);
        const normalizedUserAnswer = ((userAnswer as string) || '').trim().toLowerCase();
        const normalizedCorrectWord = q.correctWord.toLowerCase().trim();
        const isUnderlinedWordCorrect = underlinedWord?.toLowerCase().trim() === normalizedCorrectWord;

        if (isUnderlinedWordCorrect) {
          isCorrect = normalizedUserAnswer === '!';
          correctAnswer = '!';
        } else {
          isCorrect = normalizedUserAnswer === normalizedCorrectWord;
          correctAnswer = q.correctWord;
        }

        userAnswerDisplay = (userAnswer as string) || 'No answer';
        break;
      }

      case 'fill-blank': {
        const q = question as FillBlankQuestion;
        const normalizedAnswer = ((userAnswer as string) || '').toLowerCase().trim();
        isCorrect = q.correct.some(
          (ans: string) => ans.toLowerCase().trim() === normalizedAnswer
        );
        correctAnswer = q.correct[0];
        userAnswerDisplay = (userAnswer as string) || 'No answer';
        break;
      }

      case 'arrangement': {
        const q = question as ArrangementQuestion;
        const arr = userAnswer as number[] | null;
        if (arr) {
          isCorrect = arr.every((pos, idx) => pos === idx);
          userAnswerDisplay = arr.map(pos => q.items[pos]).join(' → ');
        } else {
          userAnswerDisplay = 'No answer';
        }
        correctAnswer = q.items.join(' → ');
        break;
      }

      case 'statement-ab': {
        const q = question as StatementQuestion;
        const userSelection = userAnswer as number[] | null;

        const formatAnswer = (nums: number[]): string => {
          if (nums.length === 0) return 'None are correct';
          if (nums.length === q.statements.length) return 'All are correct';
          if (nums.length === 1) return `Only Statement ${nums[0]} is correct`;
          return `Only Statements ${nums.slice(0, -1).join(', ')} and ${nums[nums.length - 1]} are correct`;
        };

        const arraysMatch = (a: number[], b: number[]): boolean => {
          if (a.length !== b.length) return false;
          const sortedA = [...a].sort();
          const sortedB = [...b].sort();
          return sortedA.every((val, idx) => val === sortedB[idx]);
        };

        isCorrect = userSelection ? arraysMatch(userSelection, q.correct) : false;
        correctAnswer = formatAnswer(q.correct);
        userAnswerDisplay = userSelection ? formatAnswer(userSelection) : 'No answer';
        break;
      }

      case 'fill-blank-inline': {
        const q = question as FillBlankInlineQuestion;
        const answers = userAnswer as string[] | null;
        if (answers && answers.length === q.correct.length) {
          isCorrect = answers.every((ans, idx) =>
            ans.toLowerCase().trim() === q.correct[idx].toLowerCase().trim()
          );
          userAnswerDisplay = answers.join(', ') || 'No answer';
        } else {
          userAnswerDisplay = 'No answer';
        }
        correctAnswer = q.correct.join(', ');
        break;
      }
    }

    return { isCorrect, correctAnswer, userAnswerDisplay };
  }, []);

  const doSubmitQuiz = useCallback((
    questionsToSubmit: QuizQuestion[],
    answersToSubmit: Map<number, Answer>,
    pauseTimer: () => void,
    timeRemaining: number
  ) => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    pauseTimer();

    const totalTime = QUIZ_CONFIG.timeLimitMinutes * 60;
    const timeElapsed = totalTime - timeRemaining;

    let correct = 0;
    let points = 0;
    const pointsPerQuestion = 2;
    const totalPoints = questionsToSubmit.length * pointsPerQuestion;
    const details: QuizResult[] = [];

    // Collect results for SRS/IRT recording
    const srsResults: Array<{ questionId: QuestionId; correct: boolean }> = [];

    questionsToSubmit.forEach((question, i) => {
      const userAnswer = answersToSubmit.get(i) ?? null;
      const result = checkAnswer(question, userAnswer);
      const isBonus = i === questionsToSubmit.length - 1;
      const earnedPoints = result.isCorrect ? pointsPerQuestion : 0;

      if (result.isCorrect) {
        correct++;
        points += pointsPerQuestion;
      }

      let questionText = '';
      if (question.type === 'statement-ab') {
        const q = question as StatementQuestion;
        questionText = q.statements.map((s, idx) => `${idx + 1}: ${s}`).join('\n');
      } else if ('question' in question) {
        questionText = (question as { question: string }).question;
      }

      const qId = questionIdMapRef.current.get(i);

      details.push({
        question: questionText,
        questionId: qId,
        userAnswer: result.userAnswerDisplay,
        correctAnswer: result.correctAnswer,
        isCorrect: result.isCorrect,
        explanation: question.explanation,
        isBonus,
        points: earnedPoints,
      });

      // Track for SRS
      if (qId) {
        srsResults.push({ questionId: qId, correct: result.isCorrect });
      }
    });

    const quizResults: QuizResults = {
      correct,
      total: questionsToSubmit.length,
      points,
      totalPoints,
      timeElapsed,
      details,
    };

    setResults(quizResults);
    updateProgress(correct, questionsToSubmit.length);

    // Record adaptive data (SRS intervals, theta update, difficulty calibration)
    if (srsResults.length > 0) {
      recordSessionResults(srsResults);
    }

    setCurrentScreen('results');
  }, [checkAnswer, updateProgress, recordSessionResults]);

  // Timer with onTimeUp callback
  const timer = useTimer({
    initialTime: QUIZ_CONFIG.timeLimitMinutes * 60,
    onTimeUp: useCallback(() => {
      if (questions.length > 0 && !hasSubmittedRef.current) {
        doSubmitQuiz(questions, answers, () => {}, 0);
      }
    }, [questions, answers, doSubmitQuiz]),
  });

  // ── Adaptive Question Selection ────────────────────────────────

  const startQuiz = useCallback(() => {
    hasSubmittedRef.current = false;

    // Crypto-grade random
    const cryptoRandom = () => {
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      return array[0] / (0xFFFFFFFF + 1);
    };

    // Fisher-Yates with crypto random (for bonus & fallback)
    const cryptoShuffle = <T,>(arr: T[]): T[] => {
      const shuffled = [...arr];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(cryptoRandom() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const regularCount = QUIZ_CONFIG.questionsPerRound - 1; // 8 regular
    const currentSession = adaptiveState.lastSessionNumber + 1;
    const theta = adaptiveState.student.theta;

    // Build weighted candidates for each question in the regular pool
    const candidates: Array<{
      index: number;
      question: Question;
      questionId: QuestionId;
      weight: number;
      tag: QuestionTag;
    }> = QUESTION_POOL.map((question, index) => {
      const qId = getQuestionId(index, false);
      const questionState = adaptiveState.questions[qId];

      // SRS weight
      const srsW = getSRSWeight(questionState, currentSession);

      // IRT weight
      const difficulty = questionState?.difficulty ?? getInitialDifficulty(index, false);
      const irtW = getIRTWeight(theta, difficulty);

      // Blended weight: 40% SRS + 60% IRT + random jitter
      const combined = 0.4 * srsW + 0.6 * irtW + cryptoRandom() * 0.15;

      // Determine tag for results screen
      let tag: QuestionTag = 'new';
      if (questionState) {
        if (questionState.consecutiveWrong > 0) {
          tag = 'review';       // previously got wrong
        } else if (questionState.attempts.length > 0) {
          tag = 'reinforcement'; // seen before, got right
        }
      }

      return { index, question, questionId: qId, weight: combined, tag };
    });

    // Weighted random sampling without replacement
    const selected: typeof candidates = [];
    const remaining = [...candidates];

    for (let i = 0; i < regularCount && remaining.length > 0; i++) {
      const totalWeight = remaining.reduce((sum, c) => sum + c.weight, 0);
      let random = cryptoRandom() * totalWeight;
      let chosenIdx = 0;

      for (let j = 0; j < remaining.length; j++) {
        random -= remaining[j].weight;
        if (random <= 0) {
          chosenIdx = j;
          break;
        }
      }

      selected.push(remaining[chosenIdx]);
      remaining.splice(chosenIdx, 1);
    }

    // Bonus: still pure random from BONUS_QUESTIONS
    const shuffledBonus = cryptoShuffle([...BONUS_QUESTIONS]);
    const bonusQuestion = shuffledBonus[0];
    const bonusIndex = BONUS_QUESTIONS.indexOf(bonusQuestion);
    const bonusId = getQuestionId(bonusIndex >= 0 ? bonusIndex : 0, true);

    // Build the session questions and ID map
    const idMap = new Map<number, QuestionId>();
    const tagMap = new Map<number, QuestionTag>();

    const selectedQuestions: Question[] = selected.map((s, i) => {
      idMap.set(i, s.questionId);
      tagMap.set(i, s.tag);
      return s.question;
    });

    // Bonus at position 8 (last)
    idMap.set(selected.length, bonusId);
    tagMap.set(selected.length, 'new');

    selectedQuestions.push(bonusQuestion);

    questionIdMapRef.current = idMap;
    questionTagsRef.current = tagMap;

    // Process multiple choice options shuffling
    const processedQuestions: QuizQuestion[] = selectedQuestions.map(q => {
      if (q.type === 'multiple-choice') {
        return shuffleOptions(q);
      }
      return q;
    });

    setQuestions(processedQuestions);
    setCurrentIndex(0);
    setAnswers(new Map());
    setResults(null);
    timer.reset(QUIZ_CONFIG.timeLimitMinutes * 60);
    timer.start();
    setCurrentScreen('quiz');
  }, [shuffleOptions, timer, adaptiveState]);

  const setAnswer = useCallback((index: number, answer: Answer) => {
    setAnswers(prev => {
      const newAnswers = new Map(prev);
      newAnswers.set(index, answer);
      return newAnswers;
    });
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, questions.length]);

  const submitQuiz = useCallback(() => {
    doSubmitQuiz(questions, answers, timer.pause, timer.timeRemaining);
  }, [doSubmitQuiz, questions, answers, timer.pause, timer.timeRemaining]);

  const returnToStart = useCallback(() => {
    hasSubmittedRef.current = false;
    setCurrentScreen('start');
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers(new Map());
    setResults(null);
    timer.reset();
  }, [timer]);

  const tryAgain = useCallback(() => {
    startQuiz();
  }, [startQuiz]);

  const currentQuestion = useMemo(() => {
    return questions[currentIndex] ?? null;
  }, [questions, currentIndex]);

  const currentAnswer = useMemo(() => {
    return answers.get(currentIndex) ?? null;
  }, [answers, currentIndex]);

  // Build adaptive info for results screen
  const adaptiveInfo: AdaptiveInfo = useMemo(() => ({
    isAdaptive: adaptiveState.student.totalSessions >= 3,
    questionTags: questionTagsRef.current,
  }), [adaptiveState.student.totalSessions]);

  return {
    // Screen state
    currentScreen,

    // Progress
    progress,
    resetProgress,

    // Quiz state
    questions,
    currentIndex,
    currentQuestion,
    currentAnswer,
    answers,

    // Timer
    timer,

    // Actions
    startQuiz,
    setAnswer,
    nextQuestion,
    submitQuiz,
    returnToStart,
    tryAgain,

    // Results
    results,

    // Config
    config: QUIZ_CONFIG,

    // Pool info
    totalQuestions: QUESTION_POOL.length,

    // Adaptive / SRS / IRT
    mastery,
    adaptiveInfo,
  };
}
