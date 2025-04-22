import React from 'react';
import clsx from 'clsx';
import styles from './Heading.module.css';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const H1 = ({ children, className, style, ...props }: HeadingProps) => (
  <h1 className={clsx(styles['h-1'], className)} style={style} {...props}>
    {children}
  </h1>
);

export const H2 = ({ children, className, style, ...props }: HeadingProps) => (
  <h2 className={clsx(styles['h-2'], className)} style={style} {...props}>
    {children}
  </h2>
);

export const H3 = ({ children, className, style, ...props }: HeadingProps) => (
  <h3 className={clsx(styles['h-3'], className)} style={style} {...props}>
    {children}
  </h3>
);

export const H4 = ({ children, className, style, ...props }: HeadingProps) => (
  <h4 className={clsx(styles['h-4'], className)} style={style} {...props}>
    {children}
  </h4>
);

export const H5 = ({ children, className, style, ...props }: HeadingProps) => (
  <h5 className={clsx(styles['h-5'], className)} style={style} {...props}>
    {children}
  </h5>
);

export const H6 = ({ children, className, style, ...props }: HeadingProps) => (
  <h6 className={clsx(className)} style={style} {...props}>
    {children}
  </h6>
);
