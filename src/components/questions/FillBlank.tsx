import type { FillBlankQuestion } from '@/types/quiz';
import { MathText } from '@/components/MathText';
import { QuestionText } from './QuestionRenderer';

interface FillBlankProps {
  question: FillBlankQuestion;
  value: string | null;
  onChange: (value: string) => void;
  showCalculator?: boolean;
}

export function FillBlank({ question, value, onChange, showCalculator }: FillBlankProps) {
  return (
    <div>
      <QuestionText showCalculator={showCalculator} className="question-text" style={{ marginBottom: '40px' }}>
        <MathText>{question.question}</MathText>
      </QuestionText>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer..."
        className="input-field"
        autoComplete="off"
      />
    </div>
  );
}
