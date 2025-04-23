'use client';
import React, { useState } from 'react';
import styles from './_styles/Settings.module.css';
import { Security, Profile, Favorite, Chart, Social } from '@/assets/icons';
import SocialSection from './_sections/SocialSection';
import SecuritySection from './_sections/SecuritySection';
import AnalyticSection from './_sections/AnalyticSection';
import FavoriteSection from './_sections/FavoriteSection';
import ProfileSection from './_sections/ProfileSection';
import { iconStyles } from '@/helpers';

interface ITabBarProps {
  tabState: number;
  setTabState: (index: number) => void;
}

interface ITabBarProps {
  tabState: number;
  setTabState: (index: number) => void;
}

//  TODO: This might be used as a shared component.

const tabs = [
  { label: 'Profile', icon: Profile },
  { label: 'Favorites', icon: Favorite },
  { label: 'Security', icon: Security },
  { label: 'Socials', icon: Social },
  { label: 'Statistics', icon: Chart },
];

const TabBar: React.FC<ITabBarProps> = ({ tabState, setTabState }) => {
  return (
    <nav className={styles.tabBarWrapper}>
      <ul className={styles.tabBox}>
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <li
              key={index}
              className={`${styles.tabItem} ${tabState === index ? styles.active : ''}`}
              onClick={() => setTabState(index)}
            >
              <Icon {...iconStyles} style={{ marginRight: 8 }} />
              <span>{tab.label}</span>
            </li>
          );
        })}
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
};

const SettingsPage = () => {
  const [tabState, setTabState] = useState<number>(0);
  return (
    <div>
      <div className={`${styles.settingsContainer} container`}>
        <h1 className={styles.sectionTextHeader}>Settings</h1>
        <TabBar tabState={tabState} setTabState={setTabState} />

        {tabState === 0 && (
          <ProfileSection
            username={'baladriel'}
            cover_img_url={null}
            profile_img_url={null}
            display_name={'test'}
            generation={1}
            country={'Turkey'}
            biography={'Cool Stuff'}
          />
        )}
        {tabState == 1 && <FavoriteSection />}
        {tabState === 2 && <SecuritySection />}
        {tabState === 3 && <SocialSection x_username='baladriel' reddit_username='baladriel' />}
        {tabState === 4 && <AnalyticSection />}
      </div>
    </div>
  );
};

export default SettingsPage;
