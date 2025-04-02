'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Composer.module.css';
import { Compass, Flame, Shell } from 'lucide-react';
import Entry from '../entry/Entry';
import { faker } from '@faker-js/faker';

interface IComposerProps {
  tabState?: number;
}

const Composer: React.FC<IComposerProps> = () => {
  const [tabState, setTabState] = useState<number>(0);

  const handleTabChange = (newTabState: number) => {
    setTabState(newTabState);
  };

  const generateRandomEntries = () => {
    return new Array(3).fill(null).map(() => ({
      title: faker.lorem.sentence(),
      snippet: faker.lorem.paragraph(),
      date: faker.date.past(),
      username: faker.internet.userName(),
    }));
  };

  const tab1Entries = generateRandomEntries();
  const tab2Entries = generateRandomEntries();
  const tab3Entries = generateRandomEntries();

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
              <Entry
                key={index}
                title={entry.title}
                snippet={entry.snippet}
                date={entry.date}
                username={entry.username}
              />
            ))}
          </div>
        )}
        {tabState === 1 && (
          <div className={styles.contentWrapper}>
            {tab2Entries.map((entry, index) => (
              <Entry
                key={index}
                title={entry.title}
                snippet={entry.snippet}
                date={entry.date}
                username={entry.username}
              />
            ))}
          </div>
        )}
        {tabState === 2 && (
          <div className={styles.contentWrapper}>
            {tab3Entries.map((entry, index) => (
              <Entry
                key={index}
                title={entry.title}
                snippet={entry.snippet}
                date={entry.date}
                username={entry.username}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Composer);
