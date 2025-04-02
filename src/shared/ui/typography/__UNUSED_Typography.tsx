'use client';
import React from 'react';
import styles from './Typography.module.css';

interface ITypographyProps {
  text?: string;
  letterSpacing?: number;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  lineHeight?: string;
}
const Typography: React.FC<ITypographyProps> = ({
  text = '',
  letterSpacing = 0,
  fontSize = '16px',
  fontWeight = 'normal',
  color = 'black',
  lineHeight = 'normal',
}) => {
  const style = {
    letterSpacing: `${letterSpacing}px`,
    fontSize,
    fontWeight,
    color,
    lineHeight,
  };

  return <div style={style}>{text}</div>;
};

export default Typography;
