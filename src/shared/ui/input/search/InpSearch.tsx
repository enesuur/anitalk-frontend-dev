'use client';
import React from 'react';
import styles from './InpSearch.module.css';
import clsx from '@/lib/cn';
import { Search } from 'lucide-react';

interface ISearchComponentProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  containerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  containerClassName?: string;
  contentClassName?: string;
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
}) => {
  return (
    <div className={clsx(styles.searchWrapper, containerClassName)} style={containerStyle}>
      <Search size={18} className={styles.searchIcon} />
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={clsx(styles.searchInput, contentClassName)}
        style={contentStyle}
      />
    </div>
  );
};

export default React.memo(InpSearch);
