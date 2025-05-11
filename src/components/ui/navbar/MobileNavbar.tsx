'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Compass, Menu, X, Newspaper } from 'lucide-react';
import { Plus, Profile, Bell, Logout } from '@/assets/icons/';
import InpSearch from '@/shared/ui/input/search/InpSearch';
import { iconStyles } from '@/helpers/index';
import clsx from '@/lib/cn';
import { useDebounce, useClickOutside } from '@/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/user/userSlice';
import { RootState } from '@/redux/store/store';
import { H2 } from '@/shared/ui/headings';
import Button from '@/shared/ui/button/Button';
import styles from './MobileNavbar.module.css';

const mockSearch = (term: string) =>
  [
    'Anime 1',
    'Manga 2',
    '@john_doe',
    '@jane_smith',
    'Anime 1',
    'Manga 2',
    '@john_doe',
    '@jane_smith',
  ].filter((item) => item.toLowerCase().includes(term.toLowerCase()));

const MobileNavbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const searchRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  useClickOutside(searchRef, () => setSearchResults([]));

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      setSearchResults(mockSearch(debouncedSearchTerm));
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <header className={clsx(styles.mobileHeaderBox)}>
      <div className={styles.topMenuWrapper}>
        <div className={clsx(styles.topMenuBox, 'container')}>
          <div className={styles.searchBox} ref={searchRef}>
            <InpSearch
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder='Talks, users and blogs...'
            />
            {searchTerm.trim() && (
              <ul className={styles.searchDropdownBox}>
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <li key={index} className={styles.resultItemBox}>
                      <Link
                        href={`/${
                          result.startsWith('@') ? 'user/' + result.slice(1) : 'search?q=' + result
                        }`}
                      >
                        {result}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className={styles.notFoundBox}>No result!</li>
                )}
              </ul>
            )}
          </div>
          <Menu
            role='button'
            aria-label='Hamburger Menu'
            className={styles.btnHamburger}
            onClick={() => setIsDrawerOpen(true)}
          />
        </div>
      </div>

      <nav className={clsx(styles.mobileNavBox, 'container')}>
        <Link href='/' className={styles.mobileItemBox}>
          <Compass {...iconStyles} />
        </Link>
        <Link href='/blogs' className={styles.mobileItemBox}>
          <Newspaper {...iconStyles} />
        </Link>
        <Link href='/create-talk' className={clsx(styles.btnTalk, styles.mobileItemBox)}>
          <Plus {...iconStyles} />
        </Link>
        <Link href='/notifications' className={clsx(styles.actionBox, styles.btnTalk)}>
          <Bell {...iconStyles} />
        </Link>
        <Link href={`/user/${user?.username}`} className={styles.mobileItemBox}>
          <Profile {...iconStyles} />
        </Link>
      </nav>

      {isDrawerOpen && (
        <div className={styles.drawerOverlay} onClick={() => setIsDrawerOpen(false)}>
          <div className={styles.drawerMenu} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeaderBox}>
              <H2>Menu</H2>
              <Button
                className={styles.btnClose}
                aria-label='Close Drawer'
                icon={<X />}
                onClick={() => setIsDrawerOpen(false)}
              />
            </div>
            <nav className={styles.drawerNavBox}>
              <Link href='/' onClick={() => setIsDrawerOpen(false)}>
                <span>Anime</span>
              </Link>
              <Link href='/' onClick={() => setIsDrawerOpen(false)}>
                <span>Manga</span>
              </Link>
              <Link href='/' onClick={() => setIsDrawerOpen(false)}>
                <span>Donghua</span>
              </Link>
              <Link href='/' onClick={() => setIsDrawerOpen(false)}>
                <span>Light Novels</span>
              </Link>
              <Link href='/' onClick={() => setIsDrawerOpen(false)}>
                <span>Amv</span>
              </Link>
              <Link href='/' onClick={() => setIsDrawerOpen(false)}>
                <span>Cosplay</span>
              </Link>
              <Link href='/' onClick={() => setIsDrawerOpen(false)}>
                <span>Blogs</span>
              </Link>
              <Link href='/' onClick={() => setIsDrawerOpen(false)}>
                <span>Newsletter</span>
              </Link>

              {user ? (
                <Button
                  icon={<Logout />}
                  variant='danger'
                  containerClassname={styles.btnLogout}
                  text='Logout'
                  onClick={() => {
                    dispatch(logout());
                    setIsDrawerOpen(false);
                  }}
                />
              ) : (
                <div className={styles.mobileUnauthBox}>
                  <Link href='/auth/sign-in' onClick={() => setIsDrawerOpen(false)}>
                    Sign in
                  </Link>
                  <Link href='/auth/sign-up' onClick={() => setIsDrawerOpen(false)}>
                    Sign up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default MobileNavbar;
