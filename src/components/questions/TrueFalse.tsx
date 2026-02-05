import { useState, useEffect, useRef } from 'react';
import { Info } from 'lucide-react';
import type { TrueFalseQuestion } from '@/types/quiz';
import { MathText } from '@/components/MathText';
import { QuestionText } from './QuestionRenderer';

interface TrueFalseProps {
  question: TrueFalseQuestion;
  value: string | null;
  onChange: (value: string) => void;
  showCalculator?: boolean;
}

// Parse question and render with underlined word and math support
function renderQuestion(question: string): React.ReactNode {
  const parts = question.split(/(_[^_]+_)/g);

  return parts.map((part, index) => {
    if (part.startsWith('_') && part.endsWith('_')) {
      const word = part.slice(1, -1);
      return (
        <span key={index} className="underline decoration-2 underline-offset-2">
          <MathText>{word}</MathText>
        </span>
      );
    }
    return <MathText key={index}>{part}</MathText>;
  });
}

export function TrueFalse({ question, value, onChange, showCalculator }: TrueFalseProps) {
  const [inputValue, setInputValue] = useState(value || '');
  const [showTooltip, setShowTooltip] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  useEffect(() => {
    // Focus the input when component mounts
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <QuestionText showCalculator={showCalculator} className="question-text" style={{ marginBottom: '40px' }}>
        {renderQuestion(question.question)}
      </QuestionText>

      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Your answer"
            className="input-field w-full"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div className="relative">
          <button
            type="button"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            <Info className="w-5 h-5" />
          </button>
          {showTooltip && (
            <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-lg z-10 text-xs text-[var(--text-secondary)]">
              Type <span className="font-mono bg-[var(--bg-tertiary)] px-1 py-0.5 rounded">!</span> if the underlined word is correct, or type the correct word if it's wrong.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
