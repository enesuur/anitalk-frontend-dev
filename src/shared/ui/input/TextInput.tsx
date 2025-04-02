'use client';
import React from 'react';
import styles from './TextInput.module.css';
import { AlertCircle } from 'lucide-react';

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  value = '',
  error = '',
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      {error && (
        <div className={styles.errorContainer}>
          <AlertCircle width={16} height={16}  />
          <span>{error}</span>
        </div>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />
    </div>
  );
};

export default React.memo(TextInput);
