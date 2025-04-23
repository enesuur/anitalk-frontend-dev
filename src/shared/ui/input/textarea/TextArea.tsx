'use client';
import React from 'react';
import styles from './TextArea.module.css';
import { AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface ITextAreaProps {
  label?: string;
  name: string;
  placeholder?: string;
  value: string | undefined | null;
  onChange?: (value: string) => void;
  error?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  cols?: number;
  style?: React.CSSProperties;
  className?: string;
  containerClassname?: string;
  containerStyle?: React.CSSProperties;
  showLabel?: boolean;
  showError?: boolean;
}

const TextArea: React.FC<ITextAreaProps> = ({
  label,
  name,
  placeholder = '',
  value = '',
  error = '',
  style,
  className,
  onChange,
  onKeyDown,
  rows = 4,
  cols = 50,
  showLabel = true,
  showError = true,
}) => {
  return (
    <div className={styles.container}>
      {showLabel && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      {showError && error && (
        <div className={styles.errorContainer}>
          <AlertCircle width={16} height={16} />
          <span>{error}</span>
        </div>
      )}
      <textarea
        id={name}
        placeholder={placeholder}
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={onKeyDown}
        rows={rows}
        cols={cols}
        style={style}
        className={clsx(styles.textarea, { [styles.textareaError]: error }, className)}
      />
    </div>
  );
};

export default React.memo(TextArea);
