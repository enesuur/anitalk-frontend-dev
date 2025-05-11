import React from 'react';
import Footer from '@/components/ui/footer/Footer';
import ScrollToTop from '@/shared/ui/scroller/Scroller';
import type { Metadata } from 'next';
import NavbarSwitcher from '@/components/nav-switcher/NavSwitcher';
import styles from './_styles/Layout.module.css';

export const metadata: Metadata = {
  title: 'Contact Us - Anitalk',
  description:
    'Get in touch with Anitalk for support, collaboration, or feedback. Reach out to the leading anime, manga, and cosplay community platform.',
  keywords:
    'contact anime site, anime support, manga community help, cosplay collaboration, contact anitalk, anime feedback, otaku contact form, anime inquiries, manga customer service, reach out anime site, anime fan communication, anime event inquiries',
  openGraph: {
    title: 'Anitalk - Contact Us',
    description:
      'Contact Anitalk for questions, feedback, or partnership opportunities in anime, manga, cosplay, and more.',
    url: 'https://www.anitalk.com/contact',
    siteName: 'Anitalk',
    images: [
      {
        url: 'https://www.anitalk.com/img/*',
        width: 1200,
        height: 630,
        alt: 'Contact Anitalk Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anitalk - Contact Us',
    description: 'Reach out to Anitalk for support, collaborations, or general inquiries.',
    images: ['https://www.anitalk.com/img/*'],
  },
};

export const revalidate = 86400;

const ContactLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <NavbarSwitcher />
      <main className={styles.layout}>{children}</main>
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  );
};

export default ContactLayout;
