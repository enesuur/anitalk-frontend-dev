import React from 'react';
import Navbar from '@/components/ui/navbar/Navbar';
import Footer from '@/components/ui/footer/Footer';
import styles from './_styles/Layout.module.css';

function PrivacyPolicy({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Navbar />
      <main className={styles.layout}>{children}</main>
      <Footer />
    </React.Fragment>
  );
}

export default PrivacyPolicy;
