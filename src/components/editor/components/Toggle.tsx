'use client';
import React from 'react';
import styles from '../styles/Toggle.module.css';

type ToggleProps = {
  onClick?: () => void;
  pressed?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function Toggle({
  onClick,
  pressed = false,
  disabled = false,
  className = '',
  children,
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
    <button
      type='button'
      aria-pressed={pressed}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
