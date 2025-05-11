import React from 'react';
import NavSwitcher from '@/components/nav-switcher/NavSwitcher';
import Footer from '@/components/ui/footer/Footer';
import { Metadata } from 'next';
import styles from './_styles/HomeLayout.module.css';

export const metadata: Metadata = {
  title: 'Feed - Anitalk',
  description:
    'See what the anime and manga community is talking about right now. Explore the latest posts, discussions, and reactions on Anitalk.',
  keywords: [
    'anime feed',
    'manga updates',
    'anitalk discussions',
    'cosplay news',
    'donghua talk',
    'anime social platform',
    'community posts',
    'anime reactions',
    'manga fanbase',
    'otaku updates',
  ],
  openGraph: {
    title: 'Anitalk - Live Anime & Manga Feed',
    description:
      'Stay connected with fellow otakus. View and join the latest anime discussions, cosplay highlights, and manga fan talks.',
    url: 'https://www.anitalk.com/',
    siteName: 'Anitalk',
    images: [
      {
        url: 'https://www.anitalk.com/img/*',
        width: 1200,
        height: 630,
        alt: 'Anitalk Feed Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anitalk - Feed',
    description:
      'Join trending anime and manga discussions on Anitalk. Discover what fans are currently watching, reading, and talking about.',
    images: ['https://www.anitalk.com/img/*'],
  },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavSwitcher />
      <main className={styles.layout}>{children}</main>
      <Footer />
    </>
  );
}
