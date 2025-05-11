'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/icons/Logo';
import { Compass } from 'lucide-react';
import InpSearch from '@/shared/ui/input/search/InpSearch';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { logout } from '@/redux/slices/user/userSlice';
import { Plus, Profile, Maintenance, Logout, Bell } from '@/assets/icons/';
import { iconStyles } from '@/helpers/index';
import clsx from '@/lib/cn';
import Tooltip from '@/shared/ui/tooltip/Tooltip';
import { useDebounce, useClickOutside } from '@/hooks';
import { PLACE_HOLDERS } from '@/helpers/constants';
import styles from './Navbar.module.css';

interface NavbarProps {
  className?: string;
  style?: React.CSSProperties;
}

const Navbar: React.FC<NavbarProps> = ({ className = '', style }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const userMenuRef = useRef<HTMLDivElement>(null);

  /* Hooks */
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useClickOutside(userMenuRef, () => setIsUserMenuOpen(false));

  /* Functions */
  const handleLogout = () => {
    dispatch(logout());
  };

  // TODO: Değişcek
  useEffect(() => {
    if (debouncedSearchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    const mockResults = ['Anime 1', 'Manga 2', '@john_doe', '@jane_smith'].filter((item) =>
      item.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
    setSearchResults(mockResults);
  }, [debouncedSearchTerm]);

  // TODO: Search API, state management

  return (
    <header className={clsx(styles.headerBox, 'container-fluid', className)} style={style}>
      <nav className={clsx(styles.navbarBox, 'container')}>
        <Link href='/' className={styles.logoBox}>
          <Logo width={72} height={72} />
          <span>Anitalk</span>
        </Link>

        <ul className={styles.rightBox}>
          <li className={styles.searchBox}>
            <InpSearch
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder='Talks,users and blogs...'
            />
            {searchResults.length > 0 && (
              <ul className={styles.searchDropdown}>
                {searchResults.map((result, index) => (
                  <li key={index} className={styles.searchResultItem}>
                    {result}
                  </li>
                ))}
              </ul>
            )}
          </li>
          {user?.isLoggedIn ? (
            <React.Fragment>
              <div className={clsx(styles.userBox, styles.userMenuWrapper)} ref={userMenuRef}>
                <div className={styles.actionBox}>
                  <Tooltip text={'Create a Talk'} position={'bottom'}>
                    <Link href={'/create-talk'} className={clsx(styles.btnTalk, styles.actionBox)}>
                      <Plus {...iconStyles} />
                      <span>Talk</span>
                    </Link>
                  </Tooltip>
                </div>
                <div className={styles.actionBox}>
                  <Tooltip text={'Open notifications'} position={'bottom'}>
                    <Link
                      href={'/notifications'}
                      className={clsx(styles.actionBox, styles.btnTalk)}
                    >
                      <Bell {...iconStyles} />
                    </Link>
                  </Tooltip>
                </div>

                <Tooltip text={'Open profile settings'} position={'bottom'}>
                  <figure
                    className={styles.avatarBox}
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  >
                    <picture>
                      <Image
                        src={user.user?.avatar_url || PLACE_HOLDERS.avatar_url}
                        alt={`${user.user?.username}'s avatar picture`}
                        fill
                        quality={80}
                      />
                    </picture>
                  </figure>
                </Tooltip>

                {isUserMenuOpen && (
                  <div className={styles.userDropdown}>
                    <Link
                      href='/'
                      className={styles.actionBox}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Compass {...iconStyles} />
                      Feed
                    </Link>
                    <Link
                      href={`/user/${user.user?.username}`}
                      className={styles.actionBox}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Profile {...iconStyles} />
                      My Profile
                    </Link>
                    <Link
                      href='/settings'
                      className={styles.actionBox}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Maintenance {...iconStyles} />
                      Settings
                    </Link>
                    <Link href={'/'} onClick={handleLogout} className={styles.actionBox}>
                      <Logout {...iconStyles} />
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li className={styles.actionBox}>
                <Link href='/auth/sign-in'>Sign in</Link>
              </li>
              <li className={styles.actionBox}>
                <Link href='/auth/sign-up'>Sign up</Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default React.memo(Navbar);
