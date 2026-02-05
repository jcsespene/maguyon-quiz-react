import { useState, useCallback, useEffect } from 'react';
import type { QuizProgress } from '@/types/quiz';

const STORAGE_KEY_PREFIX = 'quizProgress_';

const getStorageKey = (userId: string) => `${STORAGE_KEY_PREFIX}${userId}`;

const getInitialProgress = (userId: string): QuizProgress => {
  if (typeof window === 'undefined') {
    return { bestScore: null, totalAttempts: 0, lastAttempt: null };
  }

  const storageKey = getStorageKey(userId);
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return { bestScore: null, totalAttempts: 0, lastAttempt: null };
    }
  }
  return { bestScore: null, totalAttempts: 0, lastAttempt: null };
};

export function useProgress(userId: string = 'guest') {
  const [progress, setProgress] = useState<QuizProgress>(() => getInitialProgress(userId));
  const [currentUserId, setCurrentUserId] = useState(userId);

  // Reload progress when userId changes
  useEffect(() => {
    if (userId !== currentUserId) {
      setProgress(getInitialProgress(userId));
      setCurrentUserId(userId);
    }
  }, [userId, currentUserId]);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    const storageKey = getStorageKey(currentUserId);
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, currentUserId]);

  const updateProgress = useCallback((score: number, _total: number) => {
    setProgress(prev => {
      const currentBest = prev.bestScore ?? 0;
      return {
        bestScore: score > currentBest ? score : prev.bestScore,
        totalAttempts: prev.totalAttempts + 1,
        lastAttempt: new Date().toISOString(),
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    const initial: QuizProgress = {
      bestScore: null,
      totalAttempts: 0,
      lastAttempt: null,
    };
    setProgress(initial);
    const storageKey = getStorageKey(currentUserId);
    localStorage.setItem(storageKey, JSON.stringify(initial));
  }, [currentUserId]);

  return {
    progress,
    updateProgress,
    resetProgress,
  };
}
