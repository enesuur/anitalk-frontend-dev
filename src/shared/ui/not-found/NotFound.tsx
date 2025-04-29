'use client';
import React from 'react';
import { NotFound as NotFoundIcon } from '@/assets/icons';
import clsx from '@/lib/cn';
import styles from './NotFound.module.css';

interface INotFoundProps {
  text?: string;
  containerClassname?: string;
  containerStyle?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  labelClassname?: string;
  labelStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
}

const NotFoundComponent: React.FC<INotFoundProps> = ({
  text,
  containerClassname,
  containerStyle,
  contentClassName,
  contentStyle,
  iconStyle,
}) => {
  return (
    <div className={clsx(styles.notFoundWrapper, containerClassname)} style={containerStyle}>
      <p className={clsx(styles.notFoundBox, contentClassName)} style={contentStyle}>
        <NotFoundIcon className={clsx(styles.icon)} style={iconStyle} />
        <span>{`${text} not found!`}</span>
      </p>
    </div>
  );
};

export default React.memo(NotFoundComponent);
