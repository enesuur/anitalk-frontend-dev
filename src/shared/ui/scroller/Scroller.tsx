'use client';
import React, { useCallback } from 'react';
import { ArrowUpFromDot } from 'lucide-react';
import styles from './Scroller.module.css';

const scrollDuration = 500;

const ScrollToTop = () => {
  const handleScrollToTop = useCallback(() => {
    const startingY = window.scrollY;
    const distance = -startingY;
    const startTime = performance.now();

    const scrollStep = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / scrollDuration, 1);
      window.scrollTo(0, startingY + distance * progress);

      if (timeElapsed < scrollDuration) {
        requestAnimationFrame(scrollStep);
      }
    };

    requestAnimationFrame(scrollStep);
  }, []);

  return (
    <button className={styles.container} onClick={handleScrollToTop} aria-label={'Scroll to top'}>
      <ArrowUpFromDot aria-hidden={'true'} />
    </button>
  );
};

export default ScrollToTop;
