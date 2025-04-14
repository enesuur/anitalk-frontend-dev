import React from 'react';
import styles from './Divider.module.css';

interface DividerProps {
  text: string;
  style?: React.CSSProperties;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ text, style, className }) => {
  return (
    <div
      className={`${styles.dividerContainer}${className ? ' ' + className : ''}`}
      style={style}
    >
      <span className={styles.dividerText}>{text}</span>
    </div>
  );
};

export default React.memo(Divider);
