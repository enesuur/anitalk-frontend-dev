'use client';
import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav className={`${styles.footerNav} container`}>
        <ul className={styles.siteLinks}>
          <li>
            <Link href='/about-us'>About Us</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
          <li>
            <Link href='/privacy-policy'>Privacy Policy</Link>
          </li>
        </ul>

        <ul className={styles.siteLinks}>
          <li>
            <Link href='/terms-of-service'>Terms of Service</Link>
          </li>
          <li>
            <Link href='/help'>Help</Link>
          </li>
          <li>
            <Link href='/faq'>FAQ</Link>
          </li>
          <li>
            <Link href='/support'>Support</Link>
          </li>
        </ul>
        <ul className={styles.linkContainer}>
          <li>
            <Link href='/social/facebook'>
              <Facebook size={24} />
              Facebook
            </Link>
          </li>
          <li>
            <Link href='/social/twitter'>
              <Twitter size={24} />
              Twitter
            </Link>
          </li>
          <li>
            <Link href='/social/instagram'>
              <Instagram size={24} />
              Instagram
            </Link>
          </li>
        </ul>
      </nav>

      <article className={`${styles.siteDescription} container`}>
        <p>&copy; 2025 Anitalks. All rights reserved.</p>
        <p>Follow us on social media for updates and news!</p>
      </article>
    </footer>
  );
};

export default Footer;
