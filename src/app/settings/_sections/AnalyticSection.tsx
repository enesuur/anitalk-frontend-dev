import React from 'react';
import { Maintenance } from '@/assets/icons';
import clsx from '@/lib/cn';
import { H3 } from '@/shared/ui/headings';
import styles from '../_styles/AnalyticSection.module.css';

const AnalyticSection: React.FC = () => {
  return (
    <section>
      <div className={clsx(styles.analyticBox, 'container')}>
        <Maintenance />
        <article>
          <H3>This page is under maintenance, we’ll be back with blooms soon!</H3>
          <p className={styles.subtext}>
            We are working on something amazing! Please check back later.
          </p>
        </article>
      </div>
    </section>
  );
};

export default AnalyticSection;
