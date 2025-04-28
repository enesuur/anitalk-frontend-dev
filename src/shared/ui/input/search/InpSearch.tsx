'use client';
import React from 'react';
import styles from './InpSearch.module.css';
import clsx from '@/lib/cn';
import { Search } from 'lucide-react';
import { iconStyles } from '@/helpers';

interface ISearchComponentProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  containerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  containerClassName?: string;
  contentClassName?: string;
  iconClassName: string;
  iconStyle: React.CSSProperties;
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
        style={iconStyle ? iconStyle : {}}
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
    </div>
  );
};

export default InpSearch;
