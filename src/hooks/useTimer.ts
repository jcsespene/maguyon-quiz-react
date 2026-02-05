import { useState, useCallback, useEffect, useRef } from 'react';

interface UseTimerOptions {
  initialTime: number; // in seconds
  onTimeUp?: () => void;
}

export function useTimer({ initialTime, onTimeUp }: UseTimerOptions) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const onTimeUpRef = useRef(onTimeUp);

  // Keep onTimeUp callback fresh
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  // Timer effect
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          onTimeUpRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback((time?: number) => {
    setIsRunning(false);
    setTimeRemaining(time ?? initialTime);
  }, [initialTime]);

  const formatTime = useCallback((): string => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [timeRemaining]);

  const isWarning = timeRemaining <= 60;

  return {
    timeRemaining,
    isRunning,
    isWarning,
    start,
    pause,
    reset,
    formatTime,
  };
}
