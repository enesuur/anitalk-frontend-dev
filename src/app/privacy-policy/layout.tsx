import React from 'react';
import type { Metadata } from 'next';
import Footer from '@/components/ui/footer/Footer';
import NavbarSwitcher from '@/components/nav-switcher/NavSwitcher';
import styles from './_styles/Layout.module.css';

// TODO: GATHER informative site links (policies)

export const metadata: Metadata = {
  title: 'Privacy Policy - Anitalk',
  description:
    'Read the privacy policy of Anitalk to understand how we protect and manage your data.',
  keywords:
    'privacy policy, data protection, user data, privacy terms, Anitalk privacy, personal information, data collection, online privacy',
  openGraph: {
    title: 'Anitalk - Privacy Policy',
    description:
      'Anitalk’s privacy policy explains how we collect, use, and protect your personal information.',
    url: 'https://www.anitalk.com/privacy-policy',
    siteName: 'Anitalk',
    images: [
      {
        url: 'https://www.anitalk.com/img/*',
        width: 1200,
        height: 630,
        alt: 'Anitalk Privacy Policy Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anitalk - Privacy Policy',
    description:
      'Anitalk’s privacy policy explains how we collect, use, and protect your personal information.',
    images: ['https://www.anitalk.com/img/*'],
  },
};

export const revalidate = 86400;

const PrivacyLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <NavbarSwitcher />
      <main className={styles.layout}>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default PrivacyLayout;
