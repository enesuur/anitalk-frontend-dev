'use client';
import React from 'react';
import { Search, Eraser } from 'lucide-react';
import { iconStyles } from '@/helpers';
import clsx from '@/lib/cn';
import styles from './InpSearch.module.css';

interface ISearchComponentProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  containerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  containerClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
  iconStyle?: React.CSSProperties;
  disabled?: boolean;
}

const InpSearch: React.FC<ISearchComponentProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  containerStyle,
  contentStyle,
  containerClassName,
  contentClassName,
  disabled = false,
  iconClassName,
  iconStyle,
}) => {
  return (
    <div className={clsx(styles.searchWrapper, containerClassName)} style={containerStyle}>
      <Search
        {...iconStyles}
        className={clsx(styles.searchIcon, iconClassName)}
        style={iconStyle}
      />
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={clsx(styles.searchInput, contentClassName)}
        style={contentStyle}
      />
      {value && (
        <Eraser
          {...iconStyles}
          className={clsx(styles.eraserIcon)}
          onClick={() => onChange('')}
          role='button'
          aria-label='Clear search'
        />
      )}
    </div>
  );
};

export default InpSearch;
