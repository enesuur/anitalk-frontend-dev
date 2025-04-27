'use client';
import React, { useState, useRef, useCallback } from 'react';
import styles from './ToolTip.module.css';

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  customStyles?: React.CSSProperties;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = 'top',
  customStyles = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 500);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.tooltipWrapper} ${styles[position]}`}
      style={customStyles}
    >
      {children}
      {isVisible && <span className={`${styles.tooltipText} ${styles.visible}`}>{text}</span>}
    </div>
  );
};

export default React.memo(Tooltip);
