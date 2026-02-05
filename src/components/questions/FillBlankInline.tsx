import { useState, useRef, useEffect } from 'react';
import type { FillBlankInlineQuestion } from '@/types/quiz';
import { MathText } from '@/components/MathText';
import { Calculator } from '@/components/Calculator';

interface FillBlankInlineProps {
  question: FillBlankInlineQuestion;
  value: string[] | null;
  onChange: (value: string[]) => void;
  showCalculator?: boolean;
}

interface BlankInfo {
  index: number;
  hasDropdown: boolean;
  dropdownOptions?: string[];
}

export function FillBlankInline({ question, value, onChange, showCalculator }: FillBlankInlineProps) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Parse template to find blanks
  const parseTemplate = () => {
    const parts: (string | BlankInfo)[] = [];
    const regex = /\{\{blank(?::([^}]+))?\}\}/g;
    let lastIndex = 0;
    let match;
    let blankIndex = 0;

    while ((match = regex.exec(question.template)) !== null) {
      // Add text before this blank
      if (match.index > lastIndex) {
        parts.push(question.template.slice(lastIndex, match.index));
      }

      // Add blank info
      const options = match[1] ? match[1].split(',').map(s => s.trim()) : undefined;
      parts.push({
        index: blankIndex,
        hasDropdown: !!options,
        dropdownOptions: options,
      });

      blankIndex++;
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < question.template.length) {
      parts.push(question.template.slice(lastIndex));
    }

    return { parts, totalBlanks: blankIndex };
  };

  const { parts, totalBlanks } = parseTemplate();

  // Initialize answers array if needed
  const answers = value || new Array(totalBlanks).fill('');

  const updateAnswer = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    onChange(newAnswers);
  };

  const handleWordBankClick = (word: string) => {
    // Find first empty blank or replace last filled blank
    const emptyIndex = answers.findIndex(a => a === '');
    if (emptyIndex !== -1) {
      updateAnswer(emptyIndex, word);
    }
  };

  const clearBlank = (index: number) => {
    updateAnswer(index, '');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openDropdown !== null) {
        const ref = dropdownRefs.current[openDropdown];
        if (ref && !ref.contains(e.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const usedWords = answers.filter(a => a !== '');

  return (
    <div>
      {/* Template with inline blanks */}
      <div className="question-text" style={{ marginBottom: '40px', lineHeight: '2.5', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
        <div className="flex-1">
        {parts.map((part, i) => {
          if (typeof part === 'string') {
            return <MathText key={i}>{part}</MathText>;
          }

          const blank = part as BlankInfo;
          const currentAnswer = answers[blank.index] || '';

          if (blank.hasDropdown) {
            // Dropdown select blank
            return (
              <span
                key={i}
                ref={el => { dropdownRefs.current[blank.index] = el; }}
                style={{ display: 'inline-block', position: 'relative', margin: '0 4px' }}
              >
                <button
                  onClick={() => setOpenDropdown(openDropdown === blank.index ? null : blank.index)}
                  style={{
                    minWidth: '120px',
                    padding: '6px 28px 6px 10px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    background: 'var(--bg-primary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: currentAnswer ? 'var(--text-primary)' : 'var(--text-muted)',
                    position: 'relative',
                    boxShadow: 'none',
                  }}
                >
                  {currentAnswer || 'select'}
                  <span style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: `translateY(-50%) rotate(${openDropdown === blank.index ? '180deg' : '0'})`,
                    transition: 'transform 0.2s',
                  }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                {openDropdown === blank.index && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    minWidth: '120px',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    zIndex: 100,
                    marginTop: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}>
                    {blank.dropdownOptions?.map((option, optIdx) => (
                      <div
                        key={optIdx}
                        onClick={() => {
                          updateAnswer(blank.index, option);
                          setOpenDropdown(null);
                        }}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: currentAnswer === option ? 'var(--accent)' : 'var(--text-primary)',
                          background: currentAnswer === option ? 'var(--accent-bg)' : 'var(--bg-primary)',
                          borderBottom: optIdx < (blank.dropdownOptions?.length || 0) - 1 ? '1px solid var(--border-color)' : 'none',
                        }}
                        onMouseEnter={(e) => {
                          if (currentAnswer !== option) {
                            (e.target as HTMLDivElement).style.background = 'var(--bg-secondary)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLDivElement).style.background = currentAnswer === option ? 'var(--accent-bg)' : 'var(--bg-primary)';
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </span>
            );
          }

          // Text input blank (from word bank)
          return (
            <span
              key={i}
              onClick={() => currentAnswer && clearBlank(blank.index)}
              style={{
                display: 'inline-block',
                minWidth: '140px',
                padding: '6px 12px',
                margin: '0 4px',
                border: currentAnswer ? '1px solid var(--text-primary)' : '1px dashed var(--border-color)',
                borderRadius: '4px',
                background: currentAnswer ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                textAlign: 'center',
                fontSize: '15px',
                color: 'var(--text-primary)',
                cursor: currentAnswer ? 'pointer' : 'default',
                verticalAlign: 'middle',
              }}
              title={currentAnswer ? 'Click to clear' : ''}
            >
              {currentAnswer || (
                <span style={{ color: 'var(--text-muted)' }}>type your answer...</span>
              )}
            </span>
          );
        })}
        </div>
        {showCalculator && <Calculator />}
      </div>

      {/* Word Bank */}
      {question.wordBank && question.wordBank.length > 0 && (
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {question.wordBank.map((word, i) => {
              const isUsed = usedWords.includes(word);
              return (
                <button
                  key={i}
                  onClick={() => !isUsed && handleWordBankClick(word)}
                  disabled={isUsed}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    background: isUsed ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                    color: isUsed ? 'var(--text-muted)' : 'var(--text-primary)',
                    cursor: isUsed ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ marginRight: '6px', color: 'var(--text-muted)' }}>:</span>
                  {word}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
