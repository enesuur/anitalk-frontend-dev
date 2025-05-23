import React from 'react';
import NavSwitcher from '@/components/nav-switcher/NavSwitcher';
import Footer from '@/components/ui/footer/Footer';
import styles from './_styles/layout.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About us | Anitalks',
  description:
    'Learn more about Anitalks — our mission, our team, and our love for anime and manga.',
  keywords: [
    'anime',
    'manga',
    'about anitalk',
    'anitalk team',
    'anitalk mission',
    'weeb',
    'anime social platform',
    'manga social platform',
    'anime girl',
  ],
  authors: [{ name: 'Anitalk' }],
  openGraph: {
    title: 'About us | Anitalks',
    description: 'Get to know Anitalks and the story behind our anime & manga community.',
    url: 'https://anitalks.com/about-us',
    siteName: 'Anitalks',
    locale: 'en_US',
    type: 'website',
    images: ['https://anitalks.com/preview-about.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About us | Anitalks',
    description: 'Get to know the story and people behind Anitalks.',
    creator: '@anitalks',
    images: ['https://anitalks.com/preview-about.jpg'],
  },
};
export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <NavSwitcher />
      <main className={styles.layout}>{children}</main>
      <Footer />
    </React.Fragment>
  );
}
