'use client';
import React, { useState } from 'react';
import { Security, Profile, Favorite, Chart, Social } from '@/assets/icons';
import SocialSection from './_sections/SocialSection';
import SecuritySection from './_sections/SecuritySection';
import AnalyticSection from './_sections/AnalyticSection';
import FavoriteSection from './_sections/FavoriteSection';
import ProfileSection from './_sections/ProfileSection';
import { iconStyles } from '@/helpers';
import { H1 } from '@/shared/ui/headings';
import clsx from 'clsx';
import styles from './_styles/Settings.module.css';

interface ITabBarProps {
  tabState: number;
  setTabState: (index: number) => void;
}

interface ITabItem {
  label: string;
  icon: React.JSX.Element;
}

const tabs: ITabItem[] = [
  { label: 'Profile', icon: <Profile {...iconStyles} /> },
  { label: 'Favorites', icon: <Favorite {...iconStyles} /> },
  { label: 'Security', icon: <Security {...iconStyles} /> },
  { label: 'Socials', icon: <Social {...iconStyles} /> },
  { label: 'Statistics', icon: <Chart {...iconStyles} /> },
];

const TabBar: React.FC<ITabBarProps> = ({ tabState, setTabState }) => (
  <nav className={styles.tabBarWrapper}>
    <ul className={styles.tabBox}>
      {tabs.map((tab: ITabItem, index: number) => (
        <li
          key={index}
          className={clsx(styles.tabItem, { [styles.active]: tabState === index })}
          onClick={() => setTabState(index)}
        >
          <div className={styles.innerBox}>
            {tab.icon}
            <span>{tab.label}</span>
          </div>
        </li>
      ))}
    </ul>
    <div
      className={styles.animationContainer}
      style={{
        transform: `translateX(${tabState * 100}%)`,
        width: `${100 / tabs.length}%`,
      }}
    />
  </nav>
);

const SettingsPage = () => {
  const [tabState, setTabState] = useState<number>(0);

  return (
    <section>
      <div className={clsx(styles.settingsContainer, 'container')}>
        <H1>Settings</H1>
        <TabBar tabState={tabState} setTabState={setTabState} />
        {tabState === 0 && (
          <ProfileSection
            username='baladriel'
            cover_img_url={null}
            profile_img_url={null}
            display_name='test'
            generation={1}
            country='Turkey'
            biography='Cool Stuff'
          />
        )}
        {tabState === 1 && <FavoriteSection />}
        {tabState === 2 && <SecuritySection />}
        {tabState === 3 && <SocialSection x_username='baladriel' reddit_username='baladriel' />}
        {tabState === 4 && <AnalyticSection />}
      </div>
    </section>
  );
};

export default SettingsPage;
