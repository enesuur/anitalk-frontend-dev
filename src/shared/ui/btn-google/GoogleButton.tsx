import React from 'react';
import clsx from '@/lib/cn';
import { iconStyles } from '@/helpers';
import GoogleIcon from '@/assets/icons/Google';
import styles from './styles.module.css';

interface IGoogleButton {
  containerClassname?: string;
  containerStyle?: React.CSSProperties;
  onClick?: () => void;
  ariaLabel?: string;
}

const GoogleButton: React.FC<IGoogleButton> = ({
  containerClassname,
  containerStyle = {},
  onClick,
  ariaLabel = 'Google ile giriş yap',
}) => {
  return (
    <button
      type='button'
      style={containerStyle}
      className={clsx(styles.container, containerClassname)}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <GoogleIcon {...iconStyles} />
      Login via google
    </button>
  );
};

export default React.memo(GoogleButton);
