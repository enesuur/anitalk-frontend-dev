import type { Metadata } from 'next';
import Navbar from '@/components/ui/navbar/Navbar';
import Footer from '@/components/ui/footer/Footer';
import styles from './_styles/BlogLayout.module.css';
import React from 'react';
import NavbarWithPath from '@/components/client/NavbarWithPath';
export const metadata: Metadata = {
  title: 'Blog | Anitalks',
  description: 'Learn news from ',
  keywords: ['anime', 'manga', 'anime ten', 'news'],
  authors: [{ name: 'Your Site Name' }],
  openGraph: {
    title: 'Blog | Your Site Name',
    description: 'Explore the latest updates and thoughts from our team.',
    url: 'http://localhost:3000',
    siteName: 'Anitalks',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Your Site Name',
    description: 'Explore the latest updates and thoughts from our team.',
    creator: '@yourtwitterhandle',
    images: ['https://yourdomain.com/preview-image.jpg'],
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
