'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Compass, Flame, Shell } from 'lucide-react';
import Talk from '@/components/talk/Talk';
import { faker } from '@faker-js/faker';
import { generateMockTalks } from '@/data';
import styles from './Composer.module.css';
import { ITalk } from '@/types/global';

interface IComposerProps {
  tabState?: number;
}

const Composer: React.FC<IComposerProps> = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [tabState, setTabState] = useState<number>(0);

  const handleTabChange = (newTabState: number) => {
    setTabState(newTabState);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const tab1Talks = generateMockTalks(12);
  const tab2Talks = generateMockTalks(7);
  const tab3Talks = generateMockTalks(23);
  if (!isMounted) return null;
  return (
    <div className={styles.composerContainer}>
      <ul className={styles.tabControl}>
        <li
          onClick={() => handleTabChange(0)}
          className={`${styles.tabItem} ${tabState === 0 ? styles.active : ''}`}
        >
          <Link href='#'>
            <Compass />
            <span>Feed</span>
          </Link>
        </li>
        <li
          onClick={() => handleTabChange(1)}
          className={`${styles.tabItem} ${tabState === 1 ? styles.active : ''}`}
        >
          <Link href='#'>
            <Flame />
            <span>Hot Entries</span>
          </Link>
        </li>
        <li
          onClick={() => handleTabChange(2)}
          className={`${styles.tabItem} ${tabState === 2 ? styles.active : ''}`}
        >
          <Link href='#'>
            <Shell />
            <span>My Feed</span>
          </Link>
        </li>
      </ul>

      <div className={styles.tabContent}>
        {tabState === 0 && (
          <div className={styles.contentWrapper}>
            {tab1Talks.map((talk: ITalk, index: number) => (
              <Talk
                _id={talk._id}
                key={index}
                title={talk.title}
                snippet={talk.snippet}
                date={talk.date}
                username={talk.username}
                content={talk.content}
                upvote={talk.upvote}
                downvote={talk.downvote}
              />
            ))}
          </div>
        )}
        {tabState === 1 && (
          <div className={styles.contentWrapper}>
            {tab2Talks.map((talk: ITalk, index: number) => (
              <Talk
                _id={talk._id}
                key={index}
                title={talk.title}
                snippet={talk.snippet}
                date={talk.date}
                username={talk.username}
                content={talk.content}
                upvote={talk.upvote}
                downvote={talk.downvote}
              />
            ))}
          </div>
        )}
        {tabState === 2 && (
          <div className={styles.contentWrapper}>
            {tab3Talks.map((talk: ITalk, index: number) => (
              <Talk
                _id={talk._id}
                key={index}
                title={talk.title}
                snippet={talk.snippet}
                date={talk.date}
                username={talk.username}
                content={talk.content}
                upvote={talk.upvote}
                downvote={talk.downvote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Composer);
