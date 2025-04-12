'use client';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './SlideLoader.module.css';

const SlideLoader: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setShow(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShow(false);
    }, 300);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname]);

  if (!show) return null;

  return (
    <motion.div
      className={styles.container}
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    />
  );
};

export default SlideLoader;
