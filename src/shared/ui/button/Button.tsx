import React from 'react';
import clsx from '@/lib/cn';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  text?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'primary' | 'danger' | 'warn' | 'proceed';
  containerClassname?: string;
  id?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  isLoading = false,
  isDisabled = false,
  icon,
  iconPosition = 'left',
  style,
  variant = 'primary',
  containerClassname = '',
  id,
  ...props
}) => {
  const buttonClass = clsx(styles.container, styles[variant], containerClassname, {
    [styles.disabled]: isDisabled || isLoading,
  });

  return (
    <button
      {...props}
      disabled={isDisabled || isLoading}
      className={buttonClass}
      style={style}
      id={id}
    >
      {isLoading ? (
        <span className={styles.spinner}></span>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
          {text}
          {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
        </>
      )}
    </button>
  );
};

export default React.memo(Button);
