import React from 'react';
import type { Metadata } from 'next';
import Footer from '@/components/ui/footer/Footer';
import NavbarSwitcher from '@/components/nav-switcher/NavSwitcher';
import styles from './_styles/Layout.module.css';

export const metadata: Metadata = {
  title: 'Settings - Anitalk',
  description:
    'Manage your account settings on Anitalk, including profile, privacy, and preferences.',
  keywords:
    'anime, manga, donghua, novels, manhwa, manhua, cartoons, seiyu, actors, studios, reviews, news, events, cosplay, expos, conventions, figures, games, music, user settings, account preferences',
  openGraph: {
    title: 'Anitalk - Settings',
    description:
      'Manage your Anitalk account settings, update your profile, privacy, and preferences.',
    url: 'https://www.anitalk.com/settings',
    siteName: 'Anitalk',
    images: [
      {
        url: 'https://www.anitalk.com/images/og-settings.jpg',
        width: 1200,
        height: 630,
        alt: 'Anitalk Settings Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anitalk - Settings',
    description:
      'Manage your Anitalk account settings, update your profile, privacy, and preferences.',
    images: ['https://www.anitalk.com/images/og-settings.jpg'],
  },
};

export const revalidate = 60;

const SettingsLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <NavbarSwitcher />
      <main className={styles.layout}>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default SettingsLayout;
