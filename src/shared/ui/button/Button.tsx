import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  text?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  variant?: 'primary' | 'danger' | 'warn' | 'proceed';
  containerClassname?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  isLoading = false,
  isDisabled = false,
  icon,
  style,
  variant = 'primary',
  containerClassname = '',
  ...props
}) => {
  const buttonClass = clsx(styles.container, styles[variant], containerClassname, {
    [styles.disabled]: isDisabled || isLoading,
  });

  return (
    <button {...props} disabled={isDisabled || isLoading} className={buttonClass} style={style}>
      {isLoading ? (
        <span className={styles.spinner}></span>
      ) : (
        <>
          {icon && <span className={styles.icon}>{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
};

export default React.memo(Button);
