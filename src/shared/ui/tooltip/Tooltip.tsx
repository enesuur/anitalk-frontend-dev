'use client';
import React from 'react';
import styles from './ToolTip.module.css';

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  styles?: React.CSSProperties;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text, position = 'top' }) => {
  return (
    <div className={`${styles.tooltipWrapper} ${styles[position]}`} style={styles}>
      {children}
      <span className={styles.tooltipText}>{text}</span>
    </div>
  );
};

export default React.memo(Tooltip);
