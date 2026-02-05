import { useState, useEffect } from 'react';
import type { ArrangementQuestion } from '@/types/quiz';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronUp, ChevronDown, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { shuffle } from '@/lib/utils';
import { MathText } from '@/components/MathText';
import { QuestionText } from './QuestionRenderer';

interface ArrangementProps {
  question: ArrangementQuestion;
  value: number[] | null;
  onChange: (value: number[]) => void;
  showCalculator?: boolean;
}

interface SortableItemProps {
  id: string;
  index: number;
  text: string;
  totalItems: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

function SortableItem({ id, index, text, totalItems, onMoveUp, onMoveDown }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  const isFirst = index === 0;
  const isLast = index === totalItems - 1;

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        'drag-item',
        isDragging && 'dragging',
        'select-none'
      )}
      {...attributes}
      {...listeners}
    >
      <span className="text-[var(--text-muted)] cursor-grab active:cursor-grabbing hover:text-[var(--text-secondary)]">
        <GripVertical className="w-4 h-4" />
      </span>
      <span className="number-badge">{index + 1}</span>
      <span className="text-[var(--text-primary)] text-sm flex-1">
        <MathText>{text}</MathText>
      </span>

      {/* Arrow buttons */}
      <div className="flex gap-1 ml-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onMoveUp();
          }}
          disabled={isFirst}
          className={cn(
            'p-1 rounded hover:bg-[var(--bg-tertiary)] transition-colors',
            isFirst ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
          )}
          title="Move up"
        >
          <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onMoveDown();
          }}
          disabled={isLast}
          className={cn(
            'p-1 rounded hover:bg-[var(--bg-tertiary)] transition-colors',
            isLast ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
          )}
          title="Move down"
        >
          <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
        </button>
      </div>
    </li>
  );
}

export function Arrangement({ question, value, onChange, showCalculator }: ArrangementProps) {
  const [items, setItems] = useState<number[]>(() => {
    if (value) return value;
    const indices = question.items.map((_, i) => i);
    return shuffle(indices);
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Small threshold to differentiate from clicks
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    onChange(items);
  }, [items, onChange]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((_, i) => `item-${i}` === active.id);
        const newIndex = items.findIndex((_, i) => `item-${i}` === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function moveItem(fromIndex: number, toIndex: number) {
    if (toIndex < 0 || toIndex >= items.length) return;
    setItems((items) => arrayMove(items, fromIndex, toIndex));
  }

  return (
    <div>
      <QuestionText showCalculator={showCalculator} className="question-text" style={{ marginBottom: '40px' }}>
        <MathText>{question.question}</MathText>
      </QuestionText>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((_, i) => `item-${i}`)}
          strategy={verticalListSortingStrategy}
        >
          <ul>
            {items.map((originalIndex, displayIndex) => (
              <SortableItem
                key={`item-${displayIndex}`}
                id={`item-${displayIndex}`}
                index={displayIndex}
                text={question.items[originalIndex]}
                totalItems={items.length}
                onMoveUp={() => moveItem(displayIndex, displayIndex - 1)}
                onMoveDown={() => moveItem(displayIndex, displayIndex + 1)}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}
