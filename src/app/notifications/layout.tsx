import React from 'react';
import type { Metadata } from 'next';
import Footer from '@/components/ui/footer/Footer';
import NavbarSwitcher from '@/components/nav-switcher/NavSwitcher';
import styles from './_styles/Layout.module.css';

// TODO: Seo tricks later.

export const metadata: Metadata = {
  title: 'Notifications - Anitalk',
  description:
    'Stay updated with the latest notifications on your activities, interactions, and news on Anitalk.',
  keywords:
    'notifications, updates, activity notifications, Anitalk news, manga updates, anime news, community notifications, Anitalk alerts',
  openGraph: {
    title: 'Anitalk - Notifications',
    description:
      'Check out your notifications on Anitalk. Get real-time updates about your activities, interactions, and the latest news.',
    url: 'https://www.anitalk.com/notifications',
    siteName: 'Anitalk',
    images: [
      {
        url: 'https://www.anitalk.com/img/*',
        width: 1200,
        height: 630,
        alt: 'Anitalk Notifications Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anitalk - Notifications',
    description:
      'Check out your notifications on Anitalk. Get real-time updates about your activities, interactions, and the latest news.',
    images: ['https://www.anitalk.com/img/*'],
  },
};

const NotificationsLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <NavbarSwitcher />
      <main className={styles.layout}>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default NotificationsLayout;
