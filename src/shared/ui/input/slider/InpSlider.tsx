'use client';
import React, { useState, useCallback, useEffect, useId } from 'react';
import clsx from '@/lib/cn';
import styles from './InpSlider.module.css';

interface ISliderInputProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  containerClassname?: string;
  containerStyle?: React.CSSProperties;
  contentClassname?: string;
  contentStyle?: React.CSSProperties;
  icon?: React.JSX.Element;
}

const SliderInput: React.FC<ISliderInputProps> = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  onChange,
  containerClassname,
  containerStyle,
  contentClassname,
  contentStyle,
  icon,
}) => {
  const id = useId();
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      setInternalValue(newValue);
      onChange?.(newValue);
    },
    [onChange],
  );

  return (
    <div className={clsx(styles.sliderWrapper, containerClassname)} style={containerStyle}>
      {label && (
        <label htmlFor={id} className={styles.labelBox}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {label}
        </label>
      )}

      <div className={styles.inputBox}>
        <p>
          <span>Value: </span>
          <span className={styles.valueText}>{internalValue}</span>
        </p>
        <input
          id={id}
          type='range'
          min={min}
          max={max}
          step={step}
          value={internalValue}
          onChange={handleChange}
          className={clsx(styles.slider, contentClassname)}
          style={contentStyle}
        />
      </div>
    </div>
  );
};

export default React.memo(SliderInput);
