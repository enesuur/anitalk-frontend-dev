'use client';
import { useState, useCallback, useEffect } from 'react';

const useRateLimit = () => {
  const [attemptsLeft, setAttemptsLeft] = useState<number>(5);

  const getAttemptData = useCallback(() => {
    const raw = localStorage.getItem('fp_attempts');
    return raw ? JSON.parse(raw) : { count: 0, resetTime: Date.now() };
  }, []);

  const updateAttemptData = useCallback((count: number, resetTime: number) => {
    localStorage.setItem('fp_attempts', JSON.stringify({ count, resetTime }));
  }, []);

  const canAttempt = useCallback(() => {
    const { count, resetTime } = getAttemptData();
    const now = Date.now();

    if (now - resetTime > 5 * 60 * 1000) {
      updateAttemptData(0, now);
      setAttemptsLeft(5);
      return true;
    }

    if (count < 5) {
      setAttemptsLeft(5 - (count + 1));
      return true;
    }

    return false;
  }, [getAttemptData, updateAttemptData]);

  const recordAttempt = useCallback(() => {
    const { count, resetTime } = getAttemptData();
    updateAttemptData(count + 1, resetTime);
  }, [getAttemptData, updateAttemptData]);

  useEffect(() => {
    const { count } = getAttemptData();
    setAttemptsLeft(5 - count);
  }, [getAttemptData]);

  return { canAttempt, recordAttempt, attemptsLeft };
};

export default useRateLimit;
