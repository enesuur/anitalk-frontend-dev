'use client';
import React from 'react';
import { AlertCircle } from 'lucide-react';
import clsx from '@/lib/cn';
import styles from './TextInput.module.css';

interface TextInputProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string | null | undefined | number;
  onChange?: (value: string | number) => void;
  error?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  className?: string;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
  disabled?: boolean;
  readOnly?: boolean;
  hideLabel?: boolean;
  showError?: boolean;
  maxLength?: number;
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
  containerStyle,
  containerClassName,
  onChange,
  onKeyDown,
  maxLength,
  disabled = false,
  readOnly = false,
  hideLabel = false,
  showError = true,
}) => {
  return (
    <div className={clsx(styles.container, containerClassName)} style={containerStyle}>
      {!hideLabel && label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      {error && showError && (
        <div className={styles.errorContainer}>
          <AlertCircle width={16} height={16} />
          <span>{error}</span>
        </div>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        style={style}
        className={clsx(
          styles.input,
          {
            [styles.inputError]: !!error,
            'cursor-default': disabled || readOnly,
          },
          className,
        )}
      />
    </div>
  );
};

export default React.memo(TextInput);
