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
    <div className="results-screen flex flex-col w-full max-w-2xl mx-auto">
      {/* Header */}
      <h1 className="mobile-title" style={{ fontSize: '36px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px' }}>
        Results
      </h1>

      {/* Stats Row */}
      <div className="results-stats-row" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '48px',
        padding: '32px 0',
        borderBottom: '1px solid var(--border-color)',
        minHeight: '120px',
        flexShrink: 0,
      }}>
        {/* Circular Progress */}
        <div className="mobile-progress" style={{ flexShrink: 0 }}>
          <CircularProgress percent={percent} size={120} strokeWidth={8} />
        </div>

        {/* Points */}
        <div style={{ flexShrink: 0 }}>
          <div className="mobile-stat-value" style={{ fontSize: '36px', fontWeight: 500, color: 'var(--text-primary)' }}>
            {results.points}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Out of {results.totalPoints} points
          </div>
        </div>

        {/* Time */}
        <div style={{ flexShrink: 0 }}>
          <div className="mobile-stat-value" style={{ fontSize: '36px', fontWeight: 500, color: 'var(--text-primary)' }}>
            {formatTime(results.timeElapsed)}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Time for this attempt
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="results-action-section" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        padding: '24px 0',
        borderBottom: '1px solid var(--border-color)',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
          Each attempt gives you a fresh set of random questions.
        </span>
        <button
          onClick={tryAgain}
          style={{
            padding: '10px 20px',
            border: 'none',
            background: 'var(--accent)',
            color: 'white',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
          }}
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {/* You Answered */}
                      <div className="results-answer-row" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}>
                        <span className="results-answer-label" style={{
                          padding: '6px 12px',
                          background: detail.isCorrect ? '#22c55e' : '#ef4444',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: 600,
                          borderRadius: '4px',
                          minWidth: '110px',
                          textAlign: 'center',
                        }}>
                          {detail.isCorrect ? 'Correct!' : 'You Answered'}
                        </span>
                        <span style={{
                          padding: '10px 16px',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '4px',
                          fontSize: '14px',
                          color: 'var(--text-primary)',
                          flex: 1,
                        }}>
                          <MathText>{detail.userAnswer || '(No answer)'}</MathText>
                        </span>
                      </div>

                      {/* Correct Answer (only show if incorrect) */}
                      {!detail.isCorrect && (
                        <div className="results-answer-row" style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                        }}>
                          <span className="results-answer-label" style={{
                            padding: '6px 12px',
                            background: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)',
                            fontSize: '12px',
                            fontWeight: 600,
                            borderRadius: '4px',
                            minWidth: '110px',
                            textAlign: 'center',
                          }}>
                            Correct Answer
                          </span>
                          <span style={{
                            fontSize: '14px',
                            color: 'var(--text-primary)',
                          }}>
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
