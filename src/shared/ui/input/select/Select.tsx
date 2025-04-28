'use client';
import React, { useMemo, useReducer, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Select.module.css';
import { iconStyles } from '@/helpers';
import { Check } from 'lucide-react';
import clsx from 'clsx';

interface SelectInputProps {
  id?: number | string;
  label?: string | number;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  error?: string;
  containerClassname?: string;
  containerStyle?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  labelClassname?: string;
  labelStyle?: React.CSSProperties;
  icon?: React.JSX.Element;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  containerClassname,
  contentClassName,
  containerStyle,
  contentStyle,
  labelClassname,
  labelStyle,
  icon,
}) => {
  const [isOpen, toggleIsOpen] = useReducer((state: boolean) => !state, false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(() => {
    return options.find((opt) => opt.value === value) || options[0];
  }, [options, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        if (isOpen) toggleIsOpen();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={selectRef}
      className={clsx(styles.selectWrapper, containerClassname)}
      style={containerStyle}
    >
      {label && (
        <label htmlFor={name} className={clsx(styles.labelText, labelClassname)} style={labelStyle}>
          {label}
        </label>
      )}

      <div
        className={clsx(styles.select, error && styles.error, isOpen && styles.open)}
        onClick={toggleIsOpen}
        style={contentStyle}
      >
        <div className={styles.selectContent}>
          <span>{selectedOption?.label}</span>
        </div>

        <ChevronDown {...iconStyles} className={clsx(styles.iconBox, isOpen && styles.rotate)} />
      </div>

      {isOpen && (
        <ul className={styles.optionBox}>
          {options.map((option, index) => (
            <li
              key={option.value}
              className={clsx(
                styles.optionItem,
                option.value === value && index !== 0 && styles.selected,
              )}
              onClick={() => {
                if (index === 0) return;
                onChange(option.value);
                toggleIsOpen();
              }}
              style={{
                cursor: index === 0 ? 'not-allowed' : 'pointer',
                color: index === 0 ? 'gray' : 'inherit',
              }}
            >
              <div className={styles.optionLabel}>
                {option.label}
                {option.value === value && <Check className={styles.checkIcon} />}
              </div>
            </li>
          ))}
        </ul>
      )}

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default SelectInput;
