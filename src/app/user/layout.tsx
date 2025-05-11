import React from 'react';
import type { Metadata } from 'next';
import Footer from '@/components/ui/footer/Footer';
import NavbarSwitcher from '@/components/nav-switcher/NavSwitcher';
import styles from './_styles/Layout.module.css';

export const metadata: Metadata = {
  title: 'Anitalk - User Profile',
  description:
    'Explore the profile of anime, manga, and cosplay fans. See posts, followers, and interactions with your favorite content creators.',
  keywords:
    'anitalk user profile, anime fan profile, manga profile, cosplay fan profile, user posts, anime community, manga followers, otaku profile',
  openGraph: {
    title: 'Anitalk - User Profile',
    description:
      'Visit the profile of an Anitalk user. Discover their posts, followers, and connections within the anime and manga community.',
    url: 'https://www.anitalk.com/user/johndoe',
    siteName: 'Anitalk',
    images: [
      {
        url: 'https://www.anitalk.com/images/og-user-profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Anitalk User Profile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anitalk - User Profile',
    description:
      'Visit the Anitalk profile of an anime and manga fan. See their posts and interactions with the community.',
    images: ['https://www.anitalk.com/images/og-user-profile.jpg'],
  },
};

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <NavbarSwitcher />
      <main className={styles.layout}>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default UserLayout;
