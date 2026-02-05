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
      <div className="flex flex-wrap items-center gap-6 sm:gap-12 py-6 sm:py-8 border-b border-[var(--border-color)]">
        {/* Circular Progress */}
        <div className="flex-shrink-0">
          <CircularProgress percent={percent} size={100} strokeWidth={8} />
        </div>

        {/* Points */}
        <div className="flex-shrink-0">
          <div className="text-2xl sm:text-4xl font-medium text-[var(--text-primary)]">
            {results.points}
          </div>
          <div className="text-xs sm:text-sm text-[var(--text-muted)]">
            Out of {results.totalPoints} points
          </div>
        </div>

        {/* Time */}
        <div className="flex-shrink-0">
          <div className="text-2xl sm:text-4xl font-medium text-[var(--text-primary)]">
            {formatTime(results.timeElapsed)}
          </div>
          <div className="text-xs sm:text-sm text-[var(--text-muted)]">
            Time for this attempt
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
      <div style={{ padding: '24px 0' }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          marginBottom: '24px',
          fontFamily: "'TWK Lausanne', system-ui, -apple-system, sans-serif",
        }}>
          Review Answers
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {results.details.map((detail, i) => (
                <div
                  key={i}
                  style={{
                    borderBottom: i < results.details.length - 1 ? '1px solid var(--border-color)' : 'none',
                    paddingBottom: i < results.details.length - 1 ? '24px' : '0',
                    marginBottom: i < results.details.length - 1 ? '24px' : '0',
                  }}
                >
                  {/* Question Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-primary)' }}>
                        Question {i + 1}
                      </span>
                      {detail.isBonus && (
                        <span style={{
                          padding: '3px 8px',
                          background: 'var(--accent)',
                          color: 'white',
                          fontSize: '11px',
                          fontWeight: 500,
                          borderRadius: '3px',
                          textTransform: 'uppercase',
                        }}>
                          Bonus
                        </span>
                      )}
                    </div>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: detail.isCorrect ? '#22c55e' : '#ef4444',
                    }}>
                      {detail.points}/2 pts
                    </span>
                  </div>

                  {/* Question Content */}
                  <div>
                    <div style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '20px', lineHeight: '1.5' }}>
                      {detail.question.includes('\n') ? (
                        detail.question.split('\n').map((line, idx) => (
                          <div key={idx} style={{ marginBottom: idx < detail.question.split('\n').length - 1 ? '8px' : 0 }}>
                            <MathText>{line}</MathText>
                          </div>
                        ))
                      ) : (
                        <MathText>{detail.question}</MathText>
                      )}
                    </div>

                    {/* Answer Display */}
                    <div className="flex flex-col gap-3">
                      {/* You Answered */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <span className="px-3 py-1.5 rounded text-xs font-semibold text-center sm:min-w-[110px] flex-shrink-0"
                          style={{ background: detail.isCorrect ? '#22c55e' : '#ef4444', color: 'white' }}>
                          {detail.isCorrect ? 'Correct!' : 'You Answered'}
                        </span>
                        <span className="px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded text-sm text-[var(--text-primary)] flex-1 break-words">
                          <MathText>{detail.userAnswer || '(No answer)'}</MathText>
                        </span>
                      </div>

                      {/* Correct Answer (only show if incorrect) */}
                      {!detail.isCorrect && (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <span className="px-3 py-1.5 bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-xs font-semibold rounded text-center sm:min-w-[110px] flex-shrink-0">
                            Correct Answer
                          </span>
                          <span className="text-sm text-[var(--text-primary)] break-words">
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
      <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
        <button
          onClick={returnToStart}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            color: 'var(--text-muted)',
            padding: 0,
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
