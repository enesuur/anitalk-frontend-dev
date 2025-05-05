import React from 'react';
import { H3 } from '@/shared/ui/headings';
import Button from '@/shared/ui/button/Button';
import styles from './SocialCard.module.css';

export interface ISocialCardProps {
  title: string;
  url: string;
  logo: React.ReactNode;
  platformName: string;
}

const SocialCard: React.FC<ISocialCardProps> = ({ title, url, logo, platformName }) => {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className={styles.cardBox}
      aria-label={`Visit our ${platformName} page`}
      title={`Go to ${title}`}
    >
      <div className={styles.headerBox}>
        <div className={styles.logoBox}>{logo}</div>
        <H3>{title}</H3>
      </div>

      <div className={styles.platformBox}>
        <p>
          [Platform username]
          <span>{'@' + platformName}</span>
        </p>
      </div>
    </a>
  );
};

export default React.memo(SocialCard);
