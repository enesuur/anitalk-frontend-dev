import React from 'react';
import Navbar from '@/components/ui/navbar/Navbar';
import Footer from '@/components/ui/footer/Footer';
import ScrollToTop from '@/shared/ui/scroller/Scroller';
import styles from './_styles/Layout.module.css';

function Contact({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Navbar />
      <main className={styles.layout}>{children}</main>
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  );
}

export default Contact;
