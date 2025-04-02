import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  text: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ text, isLoading, isDisabled, icon, style, ...props }) => {
  return (
    <button
      {...props}
      disabled={isDisabled || isLoading}
      className={`${styles.container} ${isLoading || isDisabled ? styles.disabled : ''} ${
        isLoading ? styles.loading : ''
      }`}
      style={style}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {text}
      {isLoading && <span className={styles.spinner}></span>}
    </button>
  );
};

export default React.memo(Button);
