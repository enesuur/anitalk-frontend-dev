import React from 'react';
import styles from './CheckBox.module.css';

interface ICheckBoxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<ICheckBoxProps> = ({ label, checked, onChange }) => {
  return (
    <label className={styles.checkboxContainer}>
      <input
        type={'checkbox'}
        className={styles.checkboxInput}
        checked={checked}
        onChange={onChange}
      />
      <div className={`${styles.checkboxBox} ${checked ? styles.checked : ''}`}>
        {checked && (
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M5 13l4 4L19 7' />
          </svg>
        )}
      </div>
      {label && <span className={styles.checkboxLabel}>{label}</span>}
    </label>
  );
};

export default React.memo(Checkbox);
