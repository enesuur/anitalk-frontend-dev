// components/Navbar.tsx
'use client';
import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import Logo from '@/assets/icons/Logo';
import { SunMoon, Search } from 'lucide-react';
import SearchModal from '@/components/modals/search/SearchModal';

const Navbar = () => {
  const [themeState, setThemeState] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleThemeChange = useCallback(() => {
    setThemeState((prevState) => !prevState);
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className={`${styles.header} container-fluid`}>
      <nav className={`${styles.navbar} container`}>
        <Link href='/' className={styles.logoContainer}>
          <Logo width={72} height={72} />
          <span>Anitalk</span>
        </Link>

        <ul className={styles.navItems}>
          <li onClick={toggleModal}>
            <Search />
          </li>
          <li>
            <Link href='/auth/sign-in'>Sign in</Link>
          </li>
          <li>
            <Link href='/auth/sign-up'>Sign up</Link>
          </li>
          <li onClick={toggleThemeChange}>
            <SunMoon />
          </li>
        </ul>
      </nav>
      {isModalOpen && <SearchModal isOpen={isModalOpen} onClose={toggleModal} />}
    </header>
  );
};

export default Navbar;
