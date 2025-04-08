'use client';
import React, { useState } from 'react';
import styles from './_styles/Settings.module.css';
import { Security, Profile, Favorite, Chart, Social } from '@/assets/icons';
import ImageInput from '@/shared/ui/input/ImageInput';
import Button from '@/shared/ui/button/Button';
import SocialSection from './_components/SocialSection';
import SecuritySection from './_components/SecuritySection';

interface ITabBarProps {
  tabState: number;
  setTabState: (index: number) => void;
}

interface ITabBarProps {
  tabState: number;
  setTabState: (index: number) => void;
}

const ICON_SIZE = 20;
const ICON_COLOR = '#FFFFFF';
const ICON_OPACITY = 0.8;

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
              <Icon
                width={ICON_SIZE}
                height={ICON_SIZE}
                color={ICON_COLOR}
                style={{ opacity: ICON_OPACITY, marginRight: 8 }}
              />
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

interface IProfileSectionProps {
  username: string;
  cover_img_url?: string;
  profile_img_url?: string;
}

const ProfileSection: React.FC<IProfileSectionProps> = (
  username,
  cover_img_url,
  profile_img_url,
) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageSelect = (file: File, previewUrl: string) => {
    setSelectedImage(previewUrl);
  };

  return (
    <>
      <section>
        <h2 className={styles.settingTextHeader}>Profile Image</h2>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatarHeader}>
              <picture>
                <img
                  src={selectedImage || profile_img_url || '/img/avatar.webp'}
                  alt='Profile Picture'
                  className={styles.avatar}
                />
              </picture>
              <span>Must be JPEG, PNG, or GIF and cannot exceed 10MB.</span>
            </div>
            <Button text={'Upload'} isLoading={isLoading} isDisabled={false} />
          </div>
          <ImageInput onImageSelect={handleImageSelect} />
        </div>
      </section>

      <section>
        <h2 className={styles.settingTextHeader}>Cover Image</h2>
        <div className={styles.coverWrapper}>
          <div className={styles.coverContainer}>
            <div className={styles.coverHeader}>
              <picture>
                <img
                  src={selectedImage || cover_img_url || '/img/bg-cover.webp'}
                  alt='Cover Image'
                  className={styles.cover}
                />
              </picture>
              <span>Must be JPEG, PNG, or GIF and cannot exceed 10MB.</span>
            </div>
            <Button text={'Upload'} isLoading={isLoading} isDisabled={false} />
          </div>
          <ImageInput onImageSelect={handleImageSelect} />
        </div>
      </section>
    </>
  );
};

const SettingsPage = () => {
  const [tabState, setTabState] = useState<number>(0);
  return (
    <div>
      <div className={`${styles.settingsContainer} container`}>
        <h1 className={styles.sectionTextHeader}>Settings</h1>
        <TabBar tabState={tabState} setTabState={setTabState} />

        {tabState === 0 && <ProfileSection username={'balladriel'} />}
        {tabState === 2 && <SecuritySection />}
        {tabState === 3 && <SocialSection x_username='baladriel' reddit_username='baladriel' />}
      </div>
    </div>
  );
};

export default SettingsPage;
