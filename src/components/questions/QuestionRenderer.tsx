import type { Question, Answer, ShuffledOption } from '@/types/quiz';
import { MultipleChoice } from './MultipleChoice';
import { TrueFalse } from './TrueFalse';
import { FillBlank } from './FillBlank';
import { FillBlankInline } from './FillBlankInline';
import { Arrangement } from './Arrangement';
import { StatementAB } from './StatementAB';
import { Calculator } from '@/components/Calculator';

interface QuestionRendererProps {
  question: Question & { _shuffledOptions?: ShuffledOption[] };
  value: Answer;
  onChange: (value: Answer) => void;
}

export function QuestionRenderer({ question, value, onChange }: QuestionRendererProps) {
  const showCalculator = question.needsCalculator;

  switch (question.type) {
    case 'multiple-choice':
      return (
        <MultipleChoice
          question={question}
          value={value as number | null}
          onChange={onChange}
          showCalculator={showCalculator}
        />
      );

    case 'true-false':
      return (
        <TrueFalse
          question={question}
          value={value as string | null}
          onChange={onChange}
          showCalculator={showCalculator}
        />
      );

    case 'fill-blank':
      return (
        <FillBlank
          question={question}
          value={value as string | null}
          onChange={onChange}
          showCalculator={showCalculator}
        />
      );

    case 'fill-blank-inline':
      return (
        <FillBlankInline
          question={question}
          value={value as string[] | null}
          onChange={onChange}
          showCalculator={showCalculator}
        />
      );

    case 'arrangement':
      return (
        <Arrangement
          question={question}
          value={value as number[] | null}
          onChange={onChange}
          showCalculator={showCalculator}
        />
      );

    case 'statement-ab':
      return (
        <StatementAB
          question={question}
          value={value as number[] | null}
          onChange={onChange}
          showCalculator={showCalculator}
        />
      );

    default:
      return <p>Unknown question type</p>;
  }
}

// Reusable component for question text with optional calculator
export function QuestionText({
  children,
  showCalculator,
  className = '',
  style
}: {
  children: React.ReactNode;
  showCalculator?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`flex items-start gap-2 ${className}`} style={style}>
      <div className="flex-1">{children}</div>
      {showCalculator && <Calculator />}
    </div>
  );
}
