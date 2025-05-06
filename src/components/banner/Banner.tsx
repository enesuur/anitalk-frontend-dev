import React from 'react';
import { H2 } from '@/shared/ui/headings';
import styles from './styles.module.css';

interface IBanner {
  text?: string;
}

const Banner: React.FC<IBanner> = ({ text }): React.JSX.Element => {
  return (
    <div className={styles.bannerBox}>
      <H2>{text}</H2>
    </div>
  );
};

export default React.memo(Banner);
