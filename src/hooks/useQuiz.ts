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
import { QUESTION_POOL, BONUS_QUESTIONS, QUIZ_CONFIG } from '@/data/questions';
import { useProgress } from './useProgress';
import { useTimer } from './useTimer';

// Extended question type that includes shuffled options for multiple choice
type QuizQuestion = Question & { _shuffledOptions?: ShuffledOption[] };

export function useQuiz(userId: string = 'guest') {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, Answer>>(new Map());
  const [results, setResults] = useState<QuizResults | null>(null);

  // Use a ref to track if we've already submitted
  const hasSubmittedRef = useRef(false);

  const {
    progress,
    updateProgress,
    resetProgress,
  } = useProgress(userId);

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

        // If underlined word is correct, user should type "!"
        // If underlined word is wrong, user should type the correct word
        if (isUnderlinedWordCorrect) {
          // Correct answer is "!"
          isCorrect = normalizedUserAnswer === '!';
          correctAnswer = '!';
        } else {
          // Correct answer is the correct word
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

        // Helper to format answer display
        const formatAnswer = (nums: number[]): string => {
          if (nums.length === 0) return 'None are correct';
          if (nums.length === q.statements.length) return 'All are correct';
          if (nums.length === 1) return `Only Statement ${nums[0]} is correct`;
          return `Only Statements ${nums.slice(0, -1).join(', ')} and ${nums[nums.length - 1]} are correct`;
        };

        // Check if arrays match (order doesn't matter)
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

    questionsToSubmit.forEach((question, i) => {
      const userAnswer = answersToSubmit.get(i) ?? null;
      const result = checkAnswer(question, userAnswer);
      const isBonus = i === questionsToSubmit.length - 1; // Last question is bonus
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

      details.push({
        question: questionText,
        userAnswer: result.userAnswerDisplay,
        correctAnswer: result.correctAnswer,
        isCorrect: result.isCorrect,
        explanation: question.explanation,
        isBonus,
        points: earnedPoints,
      });
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
    setCurrentScreen('results');
  }, [checkAnswer, updateProgress]);

  // Timer with onTimeUp callback
  const timer = useTimer({
    initialTime: QUIZ_CONFIG.timeLimitMinutes * 60,
    onTimeUp: useCallback(() => {
      if (questions.length > 0 && !hasSubmittedRef.current) {
        doSubmitQuiz(questions, answers, () => {}, 0);
      }
    }, [questions, answers, doSubmitQuiz]),
  });

  const startQuiz = useCallback(() => {
    hasSubmittedRef.current = false;

    // Use crypto-grade random for better uniqueness across concurrent users
    const cryptoRandom = () => {
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      return array[0] / (0xFFFFFFFF + 1);
    };

    // Fisher-Yates with crypto random
    const cryptoShuffle = <T,>(arr: T[]): T[] => {
      const shuffled = [...arr];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(cryptoRandom() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Pick 8 random questions from the regular pool
    const regularCount = QUIZ_CONFIG.questionsPerRound - 1; // 8 regular questions
    const shuffledPool = cryptoShuffle([...QUESTION_POOL]);
    const regularQuestions = shuffledPool.slice(0, regularCount);

    // Pick 1 random bonus question
    const shuffledBonus = cryptoShuffle([...BONUS_QUESTIONS]);
    const bonusQuestion = shuffledBonus[0];

    // Combine: 8 regular + 1 bonus at the end
    const selectedQuestions: Question[] = [...regularQuestions, bonusQuestion];

    // Shuffle options for multiple choice questions (also with crypto random)
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
  }, [shuffleOptions, timer]);

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
    // Start a new quiz with fresh random questions
    startQuiz();
  }, [startQuiz]);

  const currentQuestion = useMemo(() => {
    return questions[currentIndex] ?? null;
  }, [questions, currentIndex]);

  const currentAnswer = useMemo(() => {
    return answers.get(currentIndex) ?? null;
  }, [answers, currentIndex]);

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
  };
}
