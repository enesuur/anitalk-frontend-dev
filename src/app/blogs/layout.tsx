import type { Metadata } from 'next';
import Footer from '@/components/ui/footer/Footer';
import React from 'react';
import NavbarWithPath from '@/components/client/NavbarWithPath';
import styles from './_styles/BlogLayout.module.css';

export const metadata: Metadata = {
  title: 'Anime & Manga Blog | Anitalk',
  description:
    'Stay updated with the latest anime news, manga releases, cosplay trends, and otaku culture insights. Discover top anime rankings and upcoming series.',
  keywords: [
    'anime news',
    'manga updates',
    'cosplay blog',
    'anime blog',
    'otaku culture',
    'top anime',
    'anime reviews',
    'new anime releases',
    'seasonal anime',
    'anime trends',
  ],
  authors: [{ name: 'Anitalk Team' }],
  openGraph: {
    title: 'Anime & Manga Blog | Anitalk',
    description:
      'Explore trending anime news, latest manga chapters, and top cosplay events from the Anitalk blog.',
    url: 'https://www.anitalk.com/blogs',
    siteName: 'Anitalk',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.anitalk.com/img/*',
        width: 1200,
        height: 630,
        alt: 'Anitalk Blog Cover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anime & Manga Blog | Anitalk',
    description:
      'Latest news, reviews, and stories from the anime, manga, and cosplay world – powered by Anitalk.',
    creator: '@anitalk_official',
    images: ['https://www.anitalk.com/img/*'],
  },
};

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <NavbarWithPath />
      <main className={styles.blogLayout}>{children}</main>
      <Footer />
    </React.Fragment>
  );
}
