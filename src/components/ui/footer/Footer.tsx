'use client';
import React from 'react';
import Link from 'next/link';
import clsx from '@/lib/cn';
import { XVariant, Instagram, Facebook } from '@/assets/icons';
import { iconStyles } from '@/helpers';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <nav className={clsx(styles.navBox, 'container')}>
        <ul className={styles.verticalBox}>
          <li>Site Navigation</li>
          <li>
            <Link href='/about-us'>About Us</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
          <li>
            <Link href='/privacy-policy'>Privacy Policy</Link>
          </li>
          <li>
            <Link href='/blogs'>Blogs</Link>
          </li>
          <li>
            <Link href='/'>Feed</Link>
          </li>
        </ul>

        <ul className={styles.verticalBox}>
          <li>Guidance</li>
          <li>
            <Link href='/terms-of-service'>Terms of Service</Link>
          </li>
          <li>
            <Link href='/help'>Help</Link>
          </li>
          <li>
            <Link href='mailto:support@anitalk.com?subject=Support Request&body=Hello, I need help with...'>
              Support
            </Link>
          </li>
        </ul>
        <ul className={styles.verticalBox}>
          <li>Social Links</li>
          <li>
            <Link
              href='https://facebook.com/anitalk'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialItem}
            >
              <Facebook {...iconStyles} />
              Facebook
            </Link>
          </li>
          <li>
            <Link
              href='https://x.com/anitalk'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialItem}
            >
              <XVariant {...iconStyles} />
              X(Twitter)
            </Link>
          </li>
          <li>
            <Link
              href='https://instagram.com/anitalk'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialItem}
            >
              <Instagram {...iconStyles} />
              Instagram
            </Link>
          </li>
        </ul>
      </nav>

      <article className={clsx(styles.onboardingBox, 'container')}>
        <p>&copy; 2025 Anitalks. All rights reserved.</p>
        <p>Follow us on social media for updates and news!</p>
      </article>
    </footer>
  );
};

export default Footer;
