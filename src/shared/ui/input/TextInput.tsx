'use client';
import React from 'react';
import styles from './TextInput.module.css';
import { AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  value = '',
  error = '',
  style,
  className,
  onChange,
  onKeyDown,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      {error && (
        <div className={styles.errorContainer}>
          <AlertCircle width={16} height={16} />
          <span>{error}</span>
        </div>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={onKeyDown}
        style={style}
        className={clsx(styles.input, { [styles.inputError]: error }, className)}
      />
    </div>
  );
};

export default React.memo(TextInput);
