'use client';
import React, { useCallback, useState } from 'react';
import Talk from '@/components/talk/Talk';
import useIsMounted from '@/hooks/useIsMounted';
import { ITalk } from '@/types/global';
import { Compass, Flame, Shell } from 'lucide-react';
import styles from './Composer.module.css';
import { motion } from 'framer-motion';

interface IComposerProps {
  currentTab: number;
  hot_talks: ITalk[];
  feed_talks: ITalk[];
  user_feed_talks: ITalk[];
}

const Composer: React.FC<IComposerProps> = ({
  currentTab = 0,
  hot_talks,
  feed_talks,
  user_feed_talks,
}) => {
  const [tabState, setTabState] = useState<number>(currentTab);
  const isMounted = useIsMounted();

  const handleTabChange = useCallback((newTab: number) => {
    setTabState(newTab);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={styles.composerBox}>
      <ul className={styles.tabBox}>
        <li
          className={`${styles.tabItem} ${tabState === 0 ? styles.active : ''}`}
          onClick={() => handleTabChange(0)}
        >
          <Compass />
          <span>Feed</span>
        </li>
        <li
          className={`${styles.tabItem} ${tabState === 1 ? styles.active : ''}`}
          onClick={() => handleTabChange(1)}
        >
          <Flame />
          <span>Hot</span>
        </li>
        <li
          className={`${styles.tabItem} ${tabState === 2 ? styles.active : ''}`}
          onClick={() => handleTabChange(2)}
        >
          <Shell />
          <span>My Feed</span>
        </li>

        <motion.div
          className={styles.animationContainer}
          animate={{ x: `${100 * tabState}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ width: `33.33%` }}
        />
      </ul>

      <div className={styles.contentWrapper}>
        {tabState === 0 && (
          <div className={styles.contentBox}>
            {feed_talks.map((talk, index) => (
              <Talk {...talk} key={talk._id || index} />
            ))}
          </div>
        )}
        {tabState === 1 && (
          <div className={styles.contentBox}>
            {hot_talks.map((talk, index) => (
              <Talk {...talk} key={talk._id || index} />
            ))}
          </div>
        )}
        {tabState === 2 && (
          <div className={styles.contentBox}>
            {user_feed_talks.map((talk, index) => (
              <Talk {...talk} key={talk._id || index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Composer);
