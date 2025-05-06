import React from 'react';
import Navbar from '@/components/ui/navbar/Navbar';
import Footer from '@/components/ui/footer/Footer';
import styles from './_styles/HomeLayout.module.css';

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Navbar />
      <main className={styles.homeLayout}>{children}</main>
      <Footer />
    </React.Fragment>
  );
}

export default HomeLayout;
