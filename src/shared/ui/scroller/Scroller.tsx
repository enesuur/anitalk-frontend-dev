'use client';
import React, { useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { useIsMounted } from '@/hooks';
import styles from './Scroller.module.css';

const SCROLL_DURATION = 500;

const ScrollToTop = () => {
  const isMounted = useIsMounted();

  const handleScrollToTop = useCallback(() => {
    const startingY = window.scrollY;
    const distance = -startingY;
    const startTime = performance.now();

    const scrollStep = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / SCROLL_DURATION, 1);
      window.scrollTo(0, startingY + distance * progress);

      if (timeElapsed < SCROLL_DURATION) {
        requestAnimationFrame(scrollStep);
      }
    };

    requestAnimationFrame(scrollStep);
  }, []);

  if (!isMounted) return null;

  return (
    <button className={styles.container} onClick={handleScrollToTop} aria-label='Scroll to top'>
      <ArrowUp aria-hidden='true' />
    </button>
  );
};

export default React.memo(ScrollToTop);
