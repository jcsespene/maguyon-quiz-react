import { useMemo } from 'react';
import type { StatementQuestion } from '@/types/quiz';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/MathText';
import { Calculator } from '@/components/Calculator';

interface StatementABProps {
  question: StatementQuestion;
  value: number[] | null;
  onChange: (value: number[]) => void;
  showCalculator?: boolean;
}

// Generate all possible answer combinations for the statements
function generateOptions(statementCount: number): Array<{ value: number[]; label: string }> {
  const options: Array<{ value: number[]; label: string }> = [];

  // "None are correct" option
  options.push({ value: [], label: 'None are correct' });

  // "All are correct" option
  const allCorrect = Array.from({ length: statementCount }, (_, i) => i + 1);
  options.push({ value: allCorrect, label: 'All are correct' });

  // Individual "Only X is correct" options
  for (let i = 1; i <= statementCount; i++) {
    options.push({ value: [i], label: `Only Statement ${i} is correct` });
  }

  // For 3+ statements, add combinations of 2+ (but not all)
  if (statementCount >= 3) {
    for (let i = 1; i <= statementCount; i++) {
      for (let j = i + 1; j <= statementCount; j++) {
        options.push({
          value: [i, j],
          label: `Only Statements ${i} and ${j} are correct`
        });
      }
    }
  }

  return options;
}

// Check if two arrays have the same elements (order doesn't matter)
function arraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((val, idx) => val === sortedB[idx]);
}

export function StatementAB({ question, value, onChange, showCalculator }: StatementABProps) {
  const options = useMemo(
    () => generateOptions(question.statements.length),
    [question.statements.length]
  );

  return (
    <div>
      {/* Statements with numbers */}
      <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
        <div className="flex-1">
          {question.statements.map((statement, index) => (
            <p key={index} className="question-text" style={{ marginBottom: index < question.statements.length - 1 ? '16px' : 0 }}>
              <span style={{ fontWeight: 600, color: 'var(--accent)', marginRight: '8px' }}>{index + 1}:</span>
              <MathText>{statement}</MathText>
            </p>
          ))}
        </div>
        {showCalculator && <Calculator />}
      </div>
      <ul>
        {options.map((option, idx) => (
          <li
            key={idx}
            onClick={() => onChange(option.value)}
            className={cn('option-card', value && arraysEqual(value, option.value) && 'selected')}
          >
            <span className="text-[var(--text-primary)] text-[17px]">{option.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
