'use client';
import React from 'react';
import styles from '../styles/Toggle.module.css';
import Tooltip from '@/shared/ui/tooltip/Tooltip';

type ToggleProps = {
  onClick?: () => void;
  pressed?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  name: string;
};

export function Toggle({
  onClick,
  pressed = false,
  disabled = false,
  className = '',
  children,
  name,
}: ToggleProps) {
  const combinedClassName = [
    styles.toggle,
    pressed && styles.pressed,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tooltip text={name} styles={{ background: '#0a0a0a' }}>
      <button
        type='button'
        aria-pressed={pressed}
        onClick={onClick}
        disabled={disabled}
        className={combinedClassName}
      >
        {children}
      </button>
    </Tooltip>
  );
}
