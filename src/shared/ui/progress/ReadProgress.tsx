'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './ReadProgress.module.css';

const ReadProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progress = (scrollPosition / scrollHeight) * 100;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={styles.progressBar}>
      <div className={styles.progress} style={{ width: `${scrollProgress}%` }} />
    </div>
  );
};

export default ReadProgressBar;
