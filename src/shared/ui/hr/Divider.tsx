import React from 'react';
import styles from './Divider.module.css';

interface DividerProps {
  text: string;
}

const Divider: React.FC<DividerProps> = ({ text }) => {
  return (
    <div className={styles.dividerContainer}>
      <span className={styles.dividerText}>{text}</span>
    </div>
  );
};

export default React.memo(Divider);
