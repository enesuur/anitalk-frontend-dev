'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Composer.module.css';
import { Compass, Flame, Shell } from 'lucide-react';
import Talk from '@/components/talk/Talk';
import { faker } from '@faker-js/faker';

interface IComposerProps {
  tabState?: number;
}

const Composer: React.FC<IComposerProps> = () => {
  const [tabState, setTabState] = useState<number>(0);

  const handleTabChange = (newTabState: number) => {
    setTabState(newTabState);
  };

  const generateRandomTalk = () => {
    return new Array(10).fill(null).map(() => ({
      title: faker.lorem.sentence(),
      snippet: faker.lorem.paragraph(),
      date: faker.date.past(),
      username: faker.word.noun,
    }));
  };

  const tab1Entries = generateRandomTalk();
  const tab2Entries = generateRandomTalk();
  const tab3Entries = generateRandomTalk();

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
            {tab1Entries.map((entry, index) => (
              <Talk
                key={index}
                title={entry.title}
                snippet={entry.snippet}
                date={entry.date}
                username={entry.username}
                content={'test'}
                upvote={2}
                downvote={3}
              />
            ))}
          </div>
        )}
        {tabState === 1 && (
          <div className={styles.contentWrapper}>
            {tab2Entries.map((entry, index) => (
              <Talk
                key={index}
                title={entry.title}
                snippet={entry.snippet}
                date={entry.date}
                username={entry.username}
                content={'test'}
                upvote={2}
                downvote={3}
              />
            ))}
          </div>
        )}
        {tabState === 2 && (
          <div className={styles.contentWrapper}>
            {tab3Entries.map((entry, index) => (
              <Talk
                key={index}
                title={entry.title}
                snippet={entry.snippet}
                date={entry.date}
                username={entry.username}
                content={'test'}
                upvote={2}
                downvote={3}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Composer);
