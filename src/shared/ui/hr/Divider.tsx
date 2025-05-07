import React from 'react';
import clsx from '@/lib/cn';
import styles from './Divider.module.css';

interface DividerProps {
  text?: string;
  style?: React.CSSProperties;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ text, style, className }) => {
  return (
    <div
      className={clsx(styles.dividerContainer, className, { [styles.noText]: !text })}
      style={style}
    >
      {text && <span className={styles.dividerText}>{text}</span>}
    </div>
  );
};

export default React.memo(Divider);
