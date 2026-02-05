import { useState, useRef } from 'react';
import { Calculator as CalcIcon, X, GripHorizontal } from 'lucide-react';

export function Calculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };

    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setPosition({
        x: clientX - dragStartRef.current.x,
        y: clientY - dragStartRef.current.y,
      });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('touchend', handleDragEnd);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue;
      let result = 0;

      switch (operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '×':
          result = currentValue * inputValue;
          break;
        case '÷':
          result = currentValue / inputValue;
          break;
      }

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    if (!operation || previousValue === null) return;

    const inputValue = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = previousValue + inputValue;
        break;
      case '-':
        result = previousValue - inputValue;
        break;
      case '×':
        result = previousValue * inputValue;
        break;
      case '÷':
        result = previousValue / inputValue;
        break;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    height: '44px',
    border: '1px solid var(--border-color)',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background 0.15s',
    borderRadius: '4px',
  };

  const operatorStyle: React.CSSProperties = {
    ...buttonStyle,
    background: 'var(--bg-secondary)',
    fontWeight: 500,
  };

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      {/* Calculator Icon Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          // Reset position when opening
          if (!isOpen) setPosition({ x: 0, y: 0 });
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px',
          background: 'transparent',
          border: 'none',
          color: isOpen ? 'var(--accent)' : 'var(--text-muted)',
          cursor: 'pointer',
          transition: 'color 0.15s',
        }}
        title="Calculator"
      >
        <CalcIcon style={{ width: '16px', height: '16px' }} />
      </button>

      {/* Calculator Popup */}
      {isOpen && (
        <div
          ref={popupRef}
          style={{
            position: 'fixed',
            top: `calc(50% + ${position.y}px)`,
            left: `calc(50% + ${position.x}px)`,
            transform: 'translate(-50%, -50%)',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            width: '280px',
            maxWidth: 'calc(100vw - 32px)',
            userSelect: isDragging ? 'none' : 'auto',
          }}
        >
          {/* Drag Handle */}
          <div
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '8px',
              cursor: 'grab',
              borderBottom: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              borderRadius: '12px 12px 0 0',
            }}
          >
            <GripHorizontal style={{ width: '20px', height: '20px', color: 'var(--text-muted)' }} />
          </div>

          <div style={{ padding: '16px' }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
            }}>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>
                Calculator
              </span>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: '4px',
                  display: 'flex',
                }}
              >
                <X style={{ width: '18px', height: '18px' }} />
              </button>
            </div>

            {/* Display */}
            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '14px 16px',
              marginBottom: '12px',
              borderRadius: '8px',
              textAlign: 'right',
              fontSize: '28px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              fontVariantNumeric: 'tabular-nums',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {display}
            </div>

            {/* Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              <button onClick={clear} style={{ ...buttonStyle, color: 'var(--error)' }}>C</button>
              <button onClick={() => setDisplay(String(-parseFloat(display)))} style={buttonStyle}>±</button>
              <button onClick={() => setDisplay(String(parseFloat(display) / 100))} style={buttonStyle}>%</button>
              <button onClick={() => performOperation('÷')} style={operatorStyle}>÷</button>

              <button onClick={() => inputDigit('7')} style={buttonStyle}>7</button>
              <button onClick={() => inputDigit('8')} style={buttonStyle}>8</button>
              <button onClick={() => inputDigit('9')} style={buttonStyle}>9</button>
              <button onClick={() => performOperation('×')} style={operatorStyle}>×</button>

              <button onClick={() => inputDigit('4')} style={buttonStyle}>4</button>
              <button onClick={() => inputDigit('5')} style={buttonStyle}>5</button>
              <button onClick={() => inputDigit('6')} style={buttonStyle}>6</button>
              <button onClick={() => performOperation('-')} style={operatorStyle}>−</button>

              <button onClick={() => inputDigit('1')} style={buttonStyle}>1</button>
              <button onClick={() => inputDigit('2')} style={buttonStyle}>2</button>
              <button onClick={() => inputDigit('3')} style={buttonStyle}>3</button>
              <button onClick={() => performOperation('+')} style={operatorStyle}>+</button>

              <button onClick={() => inputDigit('0')} style={{ ...buttonStyle, gridColumn: 'span 2' }}>0</button>
              <button onClick={inputDecimal} style={buttonStyle}>.</button>
              <button onClick={calculate} style={{ ...operatorStyle, background: 'var(--accent)', color: 'white' }}>=</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
