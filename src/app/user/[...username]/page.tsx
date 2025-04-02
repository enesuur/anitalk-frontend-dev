'use client';
import React, { useCallback, useReducer, useState } from 'react';
import Image from 'next/image';
import styles from '../_styles/User.module.css';
import Link from 'next/link';
import { X, Mal, Reddit } from '@/assets/icons/index';
import Entry from '@/app/(home)/_components/entry/Entry';
import FollowModal from '@/components/modals/follow/FollowModal';
import { PartialUser } from '@/types/user';
import Button from '@/shared/ui/button/Button';
import {
  User,
  Info,
  Star,
  UserPlus,
  Flag,
  Ban,
  CheckCircle,
  MinusCircle,
  Calendar,
} from 'lucide-react';

type Tab = {
  label: string;
  icon: React.JSX.Element;
};

type TabChangerProps = {
  activeTab: number;
  setActiveTab: (tab: number) => void;
};

type State = {
  isFollowing: boolean;
  isBlocked: boolean;
};

type Action = { type: 'TOGGLE_FOLLOW' } | { type: 'TOGGLE_BLOCK' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_FOLLOW':
      return { ...state, isFollowing: !state.isFollowing };
    case 'TOGGLE_BLOCK':
      return { ...state, isBlocked: !state.isBlocked };
    default:
      return state;
  }
};

const ICON_SIZE = 16;

const TabChanger: React.FC<TabChangerProps> = ({ activeTab, setActiveTab }) => {
  const [state, dispatch] = useReducer(reducer, {
    isFollowing: false,
    isBlocked: false,
  });

  const tabs: Tab[] = [
    { label: 'Biography', icon: <User size={ICON_SIZE} /> },
    { label: 'About', icon: <Info size={ICON_SIZE} /> },
    { label: 'Favorites', icon: <Star size={ICON_SIZE} /> },
    {
      label: state.isFollowing ? 'Unfollow' : 'Follow',
      icon: state.isFollowing ? <MinusCircle size={ICON_SIZE} /> : <UserPlus size={ICON_SIZE} />,
    },
    { label: 'Report', icon: <Flag size={ICON_SIZE} /> },
    {
      label: state.isBlocked ? 'Unblock' : 'Block',
      icon: state.isBlocked ? <CheckCircle size={ICON_SIZE} /> : <Ban size={ICON_SIZE} />,
    },
  ];

  return (
    <nav className={styles.tabContainer}>
      {tabs.map((tab, index) => (
        <Button
          key={index}
          className={activeTab === index ? styles.activeTab : ''}
          onClick={() => {
            if (tab.label === 'Follow' || tab.label === 'Unfollow') {
              dispatch({ type: 'TOGGLE_FOLLOW' });
            } else if (tab.label === 'Block' || tab.label === 'Unblock') {
              dispatch({ type: 'TOGGLE_BLOCK' });
            } else {
              setActiveTab(index);
            }
          }}
          text={tab.label}
          icon={tab.icon}
        >
        </Button>
      ))}
    </nav>
  );
};

React.memo(TabChanger);

const Page = () => {
  const [isFollowModalOpen, setFollowModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<0 | 1>(0);
  const [tabState, setTabState] = useState<number>(0);

  const followers: PartialUser[] = [
    { _id: '1', username: 'Alice', avatar_url: 'https://picsum.photos/50/50' },
    { _id: '2', username: 'Bob', avatar_url: 'https://picsum.photos/50/50' },
    { _id: '3', username: 'Charlie', avatar_url: 'https://picsum.photos/50/50' },
  ];

  const following: PartialUser[] = [
    { _id: '4', username: 'David', avatar_url: 'https://picsum.photos/50/50' },
    { _id: '5', username: 'Eve', avatar_url: 'https://picsum.photos/50/50' },
    { _id: '6', username: 'Frank', avatar_url: 'https://picsum.photos/50/50' },
  ];

  const openModal = useCallback(
    (type: 0 | 1) => {
      setModalType(type);
      setFollowModalOpen(true);
    },
    [setModalType, setFollowModalOpen],
  );

  const handleTabChange = useCallback((param: number) => {
    setTabState(param);
  }, []);

  const entries = [...Array(15)].map((_, index) => ({
    key: index,
    title: `Entry Title ${index + 1}`,
    snippet: `This is a short snippet for entry ${index + 1}.`,
    date: `2025-03-3${index % 10}`,
    username: `User${index + 1}`,
  }));

  return (
    <>
      <section className={'container'}>
        <div className={styles.profileShowcase}>
          <div className={styles.profileBanner}>
            <Image
              src={'https://picsum.photos/200/300'}
              alt='profile banner'
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div className={styles.profileAvatar}>
            <Image
              src={'https://picsum.photos/200/300'}
              alt='avatar'
              width={128}
              height={128}
              className={styles.avatarImg}
            />
            <div className={styles.profileUsername}>
              <span>@0x0101</span>
              <Link href={`/profile/test`}>test</Link>
            </div>
          </div>
        </div>

        <div className={styles.profileInfo}>
          <div className={styles.profileSocial}>
            <a href={`https://x.com/test`} target='_blank' rel='noopener noreferrer'>
              <X width={16} height={16} color={'#FFFFFF'} />
              <span>--</span>
            </a>
            <a href={`https://snapchat.com/test`} target='_blank' rel='noopener noreferrer'>
              <Mal width={16} height={16} color={'#FFFFFF'} />
              <span>--</span>
            </a>
            <a href={`https://instagram.com/test`} target='_blank' rel='noopener noreferrer'>
              <Reddit width={16} height={16} color={'#FFFFFF'} />
              <span>--</span>
            </a>
          </div>

          <div className={styles.profileStats}>
            <div>
              <span>Entries</span>
              <span>1</span>
            </div>
            <div onClick={() => openModal(1)}>
              <span>Following</span>
              <span>{following.length}</span>
            </div>
            <div onClick={() => openModal(0)}>
              <span>Followers</span>
              <span>{followers.length}</span>
            </div>
          </div>
        </div>

        <TabChanger activeTab={tabState} setActiveTab={handleTabChange} />

        {tabState === 0 && (
          <div className={styles.userBiography}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, distinctio?
              Dolores, laboriosam numquam? Vel recusandae ipsum sint, reprehenderit maxime ipsa
              voluptatem laborum quia id quisquam aliquid qui provident mollitia at?
            </p>
          </div>
        )}

        <div className={styles.userOrigin}>
          <div className={styles.originLeft}>
            <span>Country:</span>
            <span>DE</span>
          </div>
          <div className={styles.originRight}>
            <span>Joined at</span>
            <span className={styles.dateContainer}>
              <Calendar width={16} height={16} color={'#FFFFFF'} />
              <span>23.02.1071</span>
            </span>
          </div>
        </div>
      </section>

      <section>
        <div className={`${styles.latestEntries} container`}>
          <h1>Latest Entries</h1>
          {entries.map((entry) => (
            <Entry
              key={entry.key}
              title={entry.title}
              snippet={entry.snippet}
              date={new Date()}
              username={entry.username}
            />
          ))}
        </div>
      </section>

      <FollowModal
        isOpen={isFollowModalOpen}
        onClose={() => setFollowModalOpen(false)}
        followers={followers}
        following={following}
        type={modalType}
      />
    </>
  );
};

export default Page;
