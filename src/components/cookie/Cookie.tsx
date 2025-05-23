'use client';
import { Cookie as CookieIcon } from 'lucide-react';
import React, { useEffect, useState, useCallback } from 'react';
import Button from '@/shared/ui/button/Button';
import Link from 'next/link';
import styles from './styles.module.css';

// TODO: REFACTOR !!!

const COOKIE_KEY = 'cookie_consent_accepted';

const Cookie = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(COOKIE_KEY, 'true');
    setShowBanner(false);
  }, []);

  const handleReject = useCallback(() => {
    localStorage.setItem(COOKIE_KEY, 'false');
    setShowBanner(false);
  }, []);

  if (!isMounted || !showBanner) return null;

  return (
    <div className={styles.cookieWrapper}>
      <div className='container'>
        <p>
          <CookieIcon style={{ display: 'inline', marginRight: '8px' }} />
          We use <span>cookies</span> to improve your experience — and yes, we love chocolate chip
          ones too. By continuing, you agree to our{' '}
          <span>
            <Link href='/privacy-policy'>Privacy Policy</Link>
          </span>
          click it for more.
        </p>
        <div className={styles.btnGroup}>
          <Button text='Accept' onClick={handleAccept} />
          <Button text='Deny' variant='danger' onClick={handleReject} />
        </div>
      </div>
    </div>
  );
};

export default Cookie;
