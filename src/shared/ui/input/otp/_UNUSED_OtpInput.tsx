'use client';
import React, { useEffect, useRef } from 'react';
import styles from './OtpInput.module.css';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange, error }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, digit: string) => {
    if (!/^\d?$/.test(digit)) return;

    const otpArray = value.split('').slice(0, 6).concat(Array(6).fill('')).slice(0, 6);
    otpArray[index] = digit;
    const newValue = otpArray.join('');
    onChange(newValue);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (value.length === 0) {
      inputRefs.current[0]?.focus();
    }
  }, [value]);

  return (
    <div className={styles.otpContainer}>
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={(el) => (inputRefs.current[i] = el)}
          value={value[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={`${styles.otpInput} ${error ? styles.inputError : ''}`}
        />
      ))}
    </div>
  );
};

export default OtpInput;
