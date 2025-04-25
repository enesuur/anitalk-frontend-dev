'use client';
import React from 'react';
import { MessageCircleMore, Podcast } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Activities.module.css';

interface IActivityProps {
  callback?: (param?: boolean) => void;
}

const Activities = ({ callback }: IActivityProps) => {
  const [tabState, setTabState] = React.useState<boolean>(false);

  const handleTabClick = (isCommentTab: boolean) => {
    setTabState(isCommentTab);
    callback?.(isCommentTab);
  };

  return (
    <nav className={styles.navBox} aria-label='Activity Tabs'>
      <ul className={styles.tabBox} role='tablist'>
        <li
          className={`${styles.itemBox} ${!tabState ? styles.active : ''}`}
          onClick={() => handleTabClick(false)}
          role='tab'
          aria-selected={!tabState}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleTabClick(false)}
        >
          <Podcast />
          <span>Talks</span>
        </li>
        <li
          className={`${styles.itemBox} ${tabState ? styles.active : ''}`}
          onClick={() => handleTabClick(true)}
          role='tab'
          aria-selected={tabState}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleTabClick(true)}
        >
          <MessageCircleMore />
          <span>Comments</span>
        </li>
        <motion.div
          className={styles.tabIndicator}
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ left: tabState ? '50%' : '0%' }}
        />
      </ul>
    </nav>
  );
};

export default Activities;
