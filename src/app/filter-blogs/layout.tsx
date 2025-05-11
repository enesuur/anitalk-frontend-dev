import React from 'react';
import NavbarSwitcher from '@/components/nav-switcher/NavSwitcher';
import Footer from '@/components/ui/footer/Footer';
import styles from './_styles/Layout.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Filtered Blogs - Anitalk',
  description:
    'Discover filtered blogs related to anime, manga, cosplay, and more. Stay updated with the latest articles and discussions on Anitalk.',
  keywords:
    'anime blogs, manga blogs, cosplay blogs, anime news, manga reviews, otaku culture, anime community, cosplay tips, anime trends, manga articles, anime events, anime reviews, otaku lifestyle, cosplay community, anime forums, Japanese culture, manga fandom',
  openGraph: {
    title: 'Anitalk - Filtered Blogs',
    description:
      'Explore the latest filtered blogs and articles on Anitalk. Stay up to date with the best anime, manga, cosplay, and otaku-related content.',
    url: 'https://www.anitalk.com/filter-blogs',
    siteName: 'Anitalk',
    images: [
      {
        url: 'https://www.anitalk.com/img/*',
        width: 1200,
        height: 630,
        alt: 'Anitalk Filtered Blogs Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anitalk - Filtered Blogs',
    description:
      'Find the latest filtered blogs on anime, manga, cosplay, and otaku culture on Anitalk.',
    images: ['https://www.anitalk.com/img/*'],
  },
};

const FilterBlogsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <NavbarSwitcher />
      <main className={styles.layout}>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default FilterBlogsLayout;
