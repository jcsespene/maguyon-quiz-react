import { ArrowLeft, RotateCcw } from 'lucide-react';
import type { QuizResults } from '@/types/quiz';
import { CircularProgress } from '@/components/CircularProgress';
import { MathText } from '@/components/MathText';

interface ResultsScreenProps {
  results: QuizResults;
  tryAgain: () => void;
  returnToStart: () => void;
}

export function ResultsScreen({
  results,
  tryAgain,
  returnToStart,
}: ResultsScreenProps) {
  const percent = Math.round((results.correct / results.total) * 100);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="results-screen flex flex-col w-full max-w-2xl mx-auto px-4 sm:px-0">
      {/* Header */}
      <h1 className="text-2xl sm:text-4xl font-medium text-[var(--text-primary)] mb-2">
        Results
      </h1>

      {/* Stats Row */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-center gap-6 sm:gap-12 py-6 sm:py-8 border-b border-[var(--border-color)]">
        {/* Circular Progress */}
        <div className="flex-shrink-0">
          <CircularProgress percent={percent} size={80} strokeWidth={6} />
        </div>

        {/* Points and Time - side by side on mobile */}
        <div className="flex gap-8 sm:gap-12">
          {/* Points */}
          <div className="text-center sm:text-left">
            <div className="text-2xl sm:text-4xl font-medium text-[var(--text-primary)]">
              {results.points}
            </div>
            <div className="text-xs sm:text-sm text-[var(--text-muted)]">
              Out of {results.totalPoints} pts
            </div>
          </div>

          {/* Time */}
          <div className="text-center sm:text-left">
            <div className="text-2xl sm:text-4xl font-medium text-[var(--text-primary)]">
              {formatTime(results.timeElapsed)}
            </div>
            <div className="text-xs sm:text-sm text-[var(--text-muted)]">
              Time taken
            </div>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 border-b border-[var(--border-color)]">
        <span className="text-sm text-[var(--text-primary)]">
          Each attempt gives you a fresh set of random questions.
        </span>
        <button
          onClick={tryAgain}
          className="px-5 py-2.5 border-none bg-[var(--accent)] text-white text-sm cursor-pointer flex items-center gap-2 flex-shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>

      {/* Review Answers */}
      <div className="py-6">
        <h2 className="text-base sm:text-lg font-medium text-[var(--text-primary)] mb-6">
          Review Answers
        </h2>

        <div className="flex flex-col">
          {results.details.map((detail, i) => (
            <div
              key={i}
              className={i < results.details.length - 1 ? 'border-b border-[var(--border-color)] pb-5 mb-5' : ''}
            >
              {/* Question Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-sm sm:text-base font-medium text-[var(--text-primary)]">
                    Q{i + 1}
                  </span>
                  {detail.isBonus && (
                    <span className="px-2 py-0.5 bg-[var(--accent)] text-white text-[10px] sm:text-xs font-medium rounded uppercase">
                      Bonus
                    </span>
                  )}
                </div>
                <span className={`text-xs sm:text-sm font-medium ${detail.isCorrect ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                  {detail.points}/2 pts
                </span>
              </div>

              {/* Question Content */}
              <div>
                <div className="text-sm sm:text-[15px] text-[var(--text-primary)] mb-4 leading-relaxed">
                  {detail.question.includes('\n') ? (
                    detail.question.split('\n').map((line, idx) => (
                      <div key={idx} className={idx < detail.question.split('\n').length - 1 ? 'mb-2' : ''}>
                        <MathText>{line}</MathText>
                      </div>
                    ))
                  ) : (
                    <MathText>{detail.question}</MathText>
                  )}
                </div>

                {/* Answer Display */}
                <div className="flex flex-col gap-2">
                  {/* You Answered */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span
                      className="px-2 py-1 rounded text-[10px] sm:text-xs font-semibold w-fit sm:min-w-[100px] text-center flex-shrink-0"
                      style={{ background: detail.isCorrect ? '#22c55e' : '#ef4444', color: 'white' }}
                    >
                      {detail.isCorrect ? 'Correct!' : 'You Answered'}
                    </span>
                    <span className="px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded text-xs sm:text-sm text-[var(--text-primary)] break-words">
                      <MathText>{detail.userAnswer || '(No answer)'}</MathText>
                    </span>
                  </div>

                  {/* Correct Answer (only show if incorrect) */}
                  {!detail.isCorrect && (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="px-2 py-1 bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-[10px] sm:text-xs font-semibold rounded w-fit sm:min-w-[100px] text-center flex-shrink-0">
                        Correct Answer
                      </span>
                      <span className="text-xs sm:text-sm text-[var(--text-primary)] break-words">
                        <MathText>{detail.correctAnswer}</MathText>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <div className="pt-4 border-t border-[var(--border-color)]">
        <button
          onClick={returnToStart}
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer text-sm text-[var(--text-muted)] p-0 hover:text-[var(--text-secondary)]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
