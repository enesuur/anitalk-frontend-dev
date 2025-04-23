'use client';
import React, { useState } from 'react';
import styles from './Topbar.module.css';
import { Circle } from 'lucide-react';
import { H1 } from '@/shared/ui/headings/index';

interface ITopbarProps {
  changeFeed?: () => void;
}

interface Tab {
  id: number;
  path: string;
  label: string;
  color: string;
}

const Topbar: React.FC<ITopbarProps> = ({ changeFeed }) => {
  const [tabState, setTabState] = useState<number>(-1);

  const tabs: Tab[] = [
    { id: 0, path: '/anime', label: 'Anime', color: 'blue' },
    { id: 1, path: '/manga', label: 'Manga', color: 'green' },
    { id: 2, path: '/donghua', label: 'Donghua', color: 'red' },
    { id: 3, path: '/novels', label: 'Novels', color: 'purple' },
    { id: 4, path: '/lightnovels', label: 'Light Novels', color: 'yellow' },
    { id: 5, path: '/manhwa', label: 'Manhwa', color: 'pink' },
    { id: 6, path: '/manhua', label: 'Manhua', color: 'teal' },
    { id: 7, path: '/cartoons', label: 'Cartoons', color: 'brown' },
    { id: 8, path: '/seiyu', label: 'Seiyu', color: 'purple' },
    { id: 9, path: '/actors', label: 'Actors', color: 'green' },
    { id: 10, path: '/studios', label: 'Studios', color: 'blue' },
    { id: 11, path: '/reviews', label: 'Reviews', color: 'yellow' },
    { id: 12, path: '/news', label: 'News', color: 'red' },
    { id: 13, path: '/events', label: 'Events', color: 'orange' },
    { id: 14, path: '/cosplay', label: 'Cosplay', color: 'brown' },
    { id: 15, path: '/expos', label: 'Expos', color: 'brown' },
    { id: 16, path: '/conventions', label: 'Conventions', color: 'blue' },
    { id: 17, path: '/figures', label: 'Figures', color: 'green' },
    { id: 18, path: '/games', label: 'Games', color: 'red' },
    { id: 19, path: '/music', label: 'Music', color: 'purple' },
  ];

  const handleTabClick = (index: number) => {
    setTabState(index);
    changeFeed && changeFeed();
  };

  return (
    <section>
      <div className='container'>
        <H1>Quick Navigation</H1>
        <nav className={styles.topbarContainer}>
          <ul className={styles.topbarList}>
            {tabs.slice(0, 10).map((tab) => (
              <li
                key={tab.id}
                className={`${styles.tabItem} ${tabState === tab.id ? styles.active : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <Circle width={16} height={16} color={tab.color} />
                <span>{tab.label}</span>
              </li>
            ))}
          </ul>
          <ul className={styles.topbarList}>
            {tabs.slice(10, 20).map((tab) => (
              <li
                key={tab.id}
                className={`${styles.tabItem} ${tabState === tab.id ? styles.active : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <Circle width={16} height={16} color={tab.color} />
                <span>{tab.label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Topbar;
