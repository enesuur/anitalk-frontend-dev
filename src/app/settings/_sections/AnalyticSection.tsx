import React from 'react';
import styles from '../_styles/AnalyticSection.module.css';
import { Maintenance } from '@/assets/icons';

const AnalyticSection: React.FC = () => {
  return (
    <section>
      <div className={`${styles.analyticContainer} container`}>
        <Maintenance/>
        <article>
          <h1>This page is under maintenance, we’ll be back with blooms soon!</h1>
          <p className={styles.subtext}>
            We are working on something amazing! Please check back later.
          </p>
        </article>
      </div>
    </section>
  );
};

export default AnalyticSection;
