'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import Logo from '@/assets/icons/Logo';
import { Search, Compass } from 'lucide-react';
import SearchModal from '@/components/modals/search/SearchModal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { logout } from '@/redux/slices/user/userSlice';
import Image from 'next/image';
import { Plus, Profile, Maintenance, Logout, Bell, Chat } from '@/assets/icons/';
import { iconStyles } from '@/helpers/index';
import Tooltip from '@/shared/ui/tooltip/Tooltip';

interface NavbarProps {
  className?: string;
  style?: React.CSSProperties;
}

const Navbar: React.FC<NavbarProps> = ({ className = '', style }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // TODO: TEST
  const imageUrl = 'https://picsum.photos/64/64';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  console.log(user.user?.avatar_url);

  return (
    <header className={`${styles.header} container-fluid ${className}`} style={style}>
      <nav className={`${styles.navbar} container`}>
        <Link href='/' className={styles.logoContainer}>
          <Logo width={72} height={72} />
          <span>Anitalk</span>
        </Link>

        <ul className={styles.navItems}>
          <Tooltip text={'Search on the site'} position={'bottom'}>
            <li onClick={toggleModal}>
              <Search />
            </li>
          </Tooltip>
          {user.isLoggedIn ? (
            <>
              <div className={`${styles.userBox} ${styles.userMenuWrapper}`} ref={userMenuRef}>
                {/* --- Entry Action Button --- */}
                <div className={styles.actionBox}>
                  <Tooltip text={'Create a Talk'} position={'bottom'}>
                    <Link href={'/create-talk'} className={`${styles.actionBox} ${styles.btnTalk}`}>
                      <Plus {...iconStyles} />
                      <span>Talk</span>
                    </Link>
                  </Tooltip>
                </div>

                <div className={styles.actionBox}>
                  <Tooltip text={'Open chats'} position={'bottom'}>
                    <Link href={'/chats'} className={`${styles.actionBox} ${styles.btnTalk}`}>
                      <Chat {...iconStyles} />
                    </Link>
                  </Tooltip>
                </div>

                <div className={styles.actionBox}>
                  <Tooltip text={'Open notifications'} position={'bottom'}>
                    <Link
                      href={'/notifications'}
                      className={`${styles.actionBox} ${styles.btnTalk}`}
                    >
                      <Bell {...iconStyles} />
                    </Link>
                  </Tooltip>
                </div>
                <Tooltip text={'Open profile settings'} position={'bottom'}>
                  <figure
                    className={styles.avatarContainer}
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  >
                    <picture>
                      <Image
                        src={user.user?.avatar_url || '/img/avatar.webp'}
                        alt={'User Avatar'}
                        fill
                        objectFit='cover'
                        objectPosition='center'
                        quality={90}
                        className={styles.img}
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
                      href='/user/botrick'
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
            </>
          ) : (
            <>
              <li>
                <Link href='/auth/sign-in'>Sign in</Link>
              </li>
              <li>
                <Link href='/auth/sign-up'>Sign up</Link>
              </li>
            </>
          )}

          {/* <li onClick={toggleThemeChange}>
            <SunMoon />
          </li> */}
        </ul>
      </nav>
      {isModalOpen && <SearchModal isOpen={isModalOpen} onClose={toggleModal} />}
    </header>
  );
};

export default Navbar;
