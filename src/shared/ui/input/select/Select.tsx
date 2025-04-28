'use client';
import React, { useMemo, useReducer, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Select.module.css';
import { iconStyles } from '@/helpers';
import { Check } from 'lucide-react';

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
    return options.find((opt) => opt.value === value && opt.value !== options[0].value);
  }, [options, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        if (isOpen) toggleIsOpen(); // Only close if open
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
      className={`${styles.selectWrapper} ${containerClassname ? containerClassname : ''}`}
      style={containerStyle}
    >
      {label && (
        <label
          htmlFor={name}
          className={`${styles.labelText} ${labelClassname ? labelClassname : ''}`}
          style={labelStyle}
        >
          {label}
        </label>
      )}

      <div
        className={`${styles.select} ${error ? styles.error : ''} ${isOpen ? styles.open : ''}`}
        onClick={toggleIsOpen}
        style={contentStyle}
      >
        <div className={styles.selectContent}>
          <span>{selectedOption ? selectedOption.label : options[0].label}</span>
        </div>

        <ChevronDown
          {...iconStyles}
          className={`${styles.iconBox} ${isOpen ? styles.rotate : ''}`}
        />
      </div>

      {isOpen && (
        <ul className={styles.optionBox}>
          {options.map((option, index) => (
            <li
              key={option.value}
              className={`${styles.optionItem} ${
                option.value === value && index !== 0 ? styles.selected : ''
              }`}
              onClick={() => {
                if (index === 0) return; // Do nothing for the first option
                onChange(option.value);
                toggleIsOpen();
              }}
              style={{
                cursor: index === 0 ? 'not-allowed' : 'pointer', // Disable cursor for the first item
                color: index === 0 ? 'gray' : 'inherit', // Gray color for the first item
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
