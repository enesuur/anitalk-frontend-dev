import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/ui/navbar/Navbar';
import Footer from '@/components/ui/footer/Footer';
import styles from './_styles/AuthLayout.module.css';

export const metadata: Metadata = {
  title: 'Anitalk - Sign up',
  description: 'Sign up page anitalk, register anitalk, anitalk form',
  keywords:
    'anime, manga, donghua, novels, manhwa, manhua, cartoons, seiyu, actors, studios, reviews, news, events, cosplay, expos, conventions, figures, games, music',
  openGraph: {
    title: 'Anitalk - Sign up',
    description: 'Sign up page anitalk, register anitalk, anitalk form',
    url: 'https://www.anitalk.com/auth/signup',
    siteName: 'Anitalk',
    images: [
      {
        url: 'https://www.anitalk.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anitalk Sign Up Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anitalk - Sign up',
    description: 'Sign up page anitalk, register anitalk, anitalk form',
    images: ['https://www.anitalk.com/images/og-image.jpg'],
  },
};

export const revalidate = 86400;

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      {/* <Navbar /> */}
      <main className={styles.layout}>{children}</main>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default AuthLayout;
