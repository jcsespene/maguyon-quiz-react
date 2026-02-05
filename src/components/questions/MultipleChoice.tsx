import { useEffect, useCallback } from 'react';
import type { MultipleChoiceQuestion, ShuffledOption } from '@/types/quiz';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/MathText';
import { QuestionText } from './QuestionRenderer';

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion & { _shuffledOptions?: ShuffledOption[] };
  value: number | null;
  onChange: (value: number) => void;
  showCalculator?: boolean;
}

export function MultipleChoice({ question, value, onChange, showCalculator }: MultipleChoiceProps) {
  const options = question._shuffledOptions ||
    question.options.map((text, i) => ({ text, originalIndex: i }));

  // Find the current display index based on the selected value
  const getCurrentDisplayIndex = useCallback(() => {
    if (value === null) return -1;
    return options.findIndex(opt => opt.originalIndex === value);
  }, [value, options]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;

      e.preventDefault();
      const currentIndex = getCurrentDisplayIndex();
      let newIndex: number;

      if (e.key === 'ArrowDown') {
        // Move down, or select first if nothing selected
        if (currentIndex === -1) {
          newIndex = 0;
        } else {
          newIndex = Math.min(currentIndex + 1, options.length - 1);
        }
      } else {
        // Move up, or select last if nothing selected
        if (currentIndex === -1) {
          newIndex = options.length - 1;
        } else {
          newIndex = Math.max(currentIndex - 1, 0);
        }
      }

      onChange(options[newIndex].originalIndex);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [getCurrentDisplayIndex, options, onChange]);

  return (
    <div>
      <QuestionText showCalculator={showCalculator} className="question-text" style={{ marginBottom: '40px' }}>
        <MathText>{question.question}</MathText>
      </QuestionText>
      <ul>
        {options.map((option, displayIndex) => (
          <li
            key={displayIndex}
            onClick={() => onChange(option.originalIndex)}
            className={cn(
              'option-card',
              value === option.originalIndex && 'selected'
            )}
          >
            <span className="option-text">
              <MathText>{option.text}</MathText>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
