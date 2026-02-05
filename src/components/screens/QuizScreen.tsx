import { useEffect, useCallback } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { QuestionRenderer } from '@/components/questions/QuestionRenderer';
import { cn } from '@/lib/utils';
import type { Question, Answer, ShuffledOption } from '@/types/quiz';

interface QuizScreenProps {
  currentIndex: number;
  totalQuestions: number;
  timeRemaining: number;
  formatTime: () => string;
  isWarning: boolean;
  currentQuestion: (Question & { _shuffledOptions?: ShuffledOption[] }) | null;
  currentAnswer: Answer;
  setAnswer: (index: number, answer: Answer) => void;
  nextQuestion: () => void;
  submitQuiz: () => void;
}

export function QuizScreen({
  currentIndex,
  totalQuestions,
  formatTime,
  isWarning,
  currentQuestion,
  currentAnswer,
  setAnswer,
  nextQuestion,
  submitQuiz,
}: QuizScreenProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const hasAnswer = (() => {
    if (currentAnswer === null || currentAnswer === undefined) return false;
    if (typeof currentAnswer === 'string' && currentAnswer.trim() === '') return false;
    if (Array.isArray(currentAnswer)) return true;
    return true;
  })();

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      submitQuiz();
    } else {
      nextQuestion();
    }
  }, [isLastQuestion, submitQuiz, nextQuestion]);

  // Handle Enter key to go to next question
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        // Don't trigger if user is typing in an input or textarea
        const activeElement = document.activeElement;
        const isTyping = activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA';

        // For fill-blank and true-false (modified) questions, allow Enter to submit
        if (isTyping && currentQuestion?.type !== 'fill-blank' && currentQuestion?.type !== 'true-false') {
          return;
        }

        // Check if there's an answer (or it's arrangement type which always has an answer)
        const canProceed = hasAnswer || currentQuestion?.type === 'arrangement';
        if (canProceed) {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasAnswer, currentQuestion?.type, handleNext]);

  if (!currentQuestion) {
    return <div className="flex items-center justify-center h-full text-[var(--text-muted)]">Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-[600px] mx-auto px-4 sm:px-0">
      {/* Question Header */}
      <div className="flex justify-between items-center" style={{ paddingBottom: '24px' }}>
        <div className="flex items-center gap-3">
          <span className="text-[22px] font-medium text-[var(--text-primary)]">Question {currentIndex + 1}</span>
          {currentIndex === totalQuestions - 1 && (
            <span style={{
              padding: '4px 10px',
              background: 'var(--accent)',
              color: 'white',
              fontSize: '12px',
              fontWeight: 500,
              borderRadius: '2px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Bonus
            </span>
          )}
        </div>
        <span className="text-[var(--text-muted)] text-base">2 pts</span>
      </div>

      {/* Progress Bar */}
      <div style={{ height: '4px', background: 'var(--bg-tertiary)', marginBottom: '40px' }}>
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--accent)',
            transition: 'width 0.3s ease'
          }}
        />
      </div>

      {/* Question Content */}
      <div className="overflow-visible">
        <div style={{ paddingBottom: '24px' }}>
          <QuestionRenderer
            question={currentQuestion}
            value={currentAnswer}
            onChange={(value) => setAnswer(currentIndex, value)}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center py-4">
        <div className={cn('text-sm', isWarning ? 'text-[var(--error)]' : 'text-[var(--text-muted)]')}>
          {formatTime()} remaining
        </div>
        <button
          onClick={handleNext}
          disabled={!hasAnswer && currentQuestion.type !== 'arrangement'}
          className="btn-primary flex items-center gap-2"
        >
          {isLastQuestion ? (
            <>
              <Check className="w-4 h-4" />
              Finish
            </>
          ) : (
            <>
              Next
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
