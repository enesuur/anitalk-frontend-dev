'use client';
import React, { useCallback, useState } from 'react';
import { Circle } from 'lucide-react';
import NewsLetter from '@/components/modals/news-letter/NewsLetter';
import { iconStyles } from '@/helpers';
import { Mail } from '@/assets/icons';
import styles from './Topbar.module.css';

export interface ITopbarProps {
  changeFeed?: () => void;
}

export interface Tab {
  id: number;
  path: string;
  label: string;
  color: string;
}

export const TABS: Tab[] = [
  { id: 0, path: '/anime', label: 'Anime', color: 'blue' },
  { id: 1, path: '/manga', label: 'Manga', color: 'green' },
  { id: 2, path: '/donghua', label: 'Donghua', color: 'red' },
  { id: 3, path: '/lightnovels', label: 'Light Novels', color: 'yellow' },
  { id: 4, path: '/amv', label: 'AMV', color: 'purple' },
  { id: 5, path: '/cosplay', label: 'Cosplay', color: 'brown' },
];

const Topbar: React.FC<ITopbarProps> = ({ changeFeed }) => {
  const [tabState, setTabState] = useState<number>(-1);
  const [newsLetterState, setNewsLetterState] = useState<boolean>(false);

  const handleTabClick = useCallback(
    (index: number) => {
      setTabState(index);
      if (changeFeed) {
        changeFeed();
      }
      return;
    },
    [changeFeed],
  );

  const handleSubscribeLetter = useCallback(() => {
    setNewsLetterState(true);
  }, []);

  return (
    <React.Fragment>
      <nav className={styles.topbarBox}>
        <ul className={styles.topbarList}>
          {TABS.map((tab) => (
            <li
              key={tab.id}
              style={{ width: `${100 / (TABS.length + 1)}%` }}
              className={`${styles.tabItem} ${tabState === tab.id ? styles.active : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              <Circle {...iconStyles} color={tab.color} />
              <span>{tab.label}</span>
            </li>
          ))}

          <li
            style={{ width: `${100 / (TABS.length + 1)}%` }}
            className={styles.tabItem}
            onClick={handleSubscribeLetter}
          >
            <Mail />
            Newsletter
          </li>
        </ul>
      </nav>
      <NewsLetter isOpen={newsLetterState} onClose={() => setNewsLetterState(false)} />
    </React.Fragment>
  );
};

export default Topbar;
