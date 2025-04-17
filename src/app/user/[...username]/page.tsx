'use client';
import React, { useCallback, useReducer, useState } from 'react';
import Image from 'next/image';
import styles from '../_styles/User.module.css';
import Link from 'next/link';
import { X, Mal, Reddit, Bunny, English, Triangle } from '@/assets/icons/index';
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
  Book,
  Globe,
} from 'lucide-react';
import AlertModal from '@/components/modals/alert/AlertModal';
import ReportModal from '@/components/modals/report/ReportModal';
import Tooltip from '@/shared/ui/tooltip/Tooltip';

type Tab = {
  label: string;
  icon: React.JSX.Element;
};

type TabChangerProps = {
  activeTab: number;
  setActiveTab: (param: number) => void;
  setAlertModal: (state: boolean) => void;
  setReportModal: (state: boolean) => void;
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

const TabChanger: React.FC<TabChangerProps> = ({
  activeTab,
  setActiveTab,
  setAlertModal,
  setReportModal,
}) => {
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
  const handleTabState = useCallback(
    (param: number) => {
      switch (param) {
        case 5:
          setAlertModal(true);
          return;
        case 4:
          setReportModal(true);
          return;
        case 3:
          dispatch({ type: 'TOGGLE_FOLLOW' });
          return;
        case 6:
          dispatch({ type: 'TOGGLE_BLOCK' });
          return;
        default:
          setActiveTab(param);
          return;
      }
    },
    [setAlertModal, setReportModal, setActiveTab, dispatch],
  );

  return (
    <nav className={styles.tabContainer}>
      {tabs.map((tab, index) => (
        <Button
          key={index}
          style={{ borderColor: activeTab === index ? '#FFFFFF' : '' }}
          onClick={() => handleTabState(index)}
          text={tab.label}
          icon={tab.icon}
        />
      ))}
    </nav>
  );
};

interface IBiographySectionProps {
  description?: string;
}

const BiographySection: React.FC<IBiographySectionProps> = ({
  description = 'Hey this guy has not completed his profile!',
}) => {
  return (
    <>
      <h2 className={styles.sectionTextHeader}>Biography</h2>
      <article className={styles.biographyContainer}>
        <p>{description}</p>
      </article>
    </>
  );
};

interface IAboutSectionProps {
  countryCode: string;
  generation: number;
  joinDate: Date;
}

const AboutSection: React.FC<IAboutSectionProps> = ({ countryCode, generation, joinDate }) => {
  const countryFlag = countryCode === 'DE' ? 'de' : '🌍';

  return (
    <>
      <h2 className={styles.sectionTextHeader}>About</h2>
      <article className={styles.aboutContainer}>
        <p className={styles.leftBox}>
          <span className={styles.labelContainer}>
            <Book size={ICON_SIZE} />
            <span>Generation:</span>
            <span>{generation}</span>
          </span>

          <span className={styles.labelContainer}>
            <Globe size={ICON_SIZE} />
            <span>Country:</span>
            <span>{countryFlag}</span>
          </span>

          <span className={styles.labelContainer}>
            <Calendar size={ICON_SIZE} />
            <span>Joined At:</span>
            <span>{joinDate.toISOString()}</span>
          </span>
        </p>
      </article>
    </>
  );
};

/* TODO: 
Animes are up to 3.
Mangas are up to 3 also. 
*/
interface IFavoriItem {
  japanese_name?: string;
  english_name?: string;
  release_date?: Date;
}

interface IFavoriteSectionProps {
  animes: IFavoriItem[];
  mangas: IFavoriItem[];
}

const FavoriteSection: React.FC<IFavoriteSectionProps> = ({ animes, mangas }) => {
  return (
    <>
      <h2 className={styles.sectionTextHeader}>Favorites</h2>
      <article className={styles.favoritesContainer}>
        <h3>Animes</h3>
        {animes.length > 0 ? (
          <ul className={styles.favoriteItem}>
            {animes.map((anime: IFavoriItem, index: number) => (
              <li key={index}>
                <h4 style={{ display: 'flex', alignItems: 'center', columnGap: '4px' }}>
                  <Triangle width={16} height={16} opacity={0.9} />
                  {index + 1}
                </h4>
                <span className={styles.itemRow}>
                  <Bunny width={16} height={16} color={'#FFFFFF'} opacity={0.9} />
                  <h5>Japanese Name:</h5>
                  {anime?.japanese_name || 'No japanese name.'}
                </span>
                <span className={styles.itemRow}>
                  <English width={16} height={16} color={'#FFFFFF'} opacity={0.9} />
                  <h4>English Name:</h4>
                  {anime?.english_name || 'No English name.'}
                </span>
                <span className={styles.itemRow}>
                  <Calendar width={16} height={16} color={'#FFFFFF'} opacity={0.9} />
                  <h5>Release Date:</h5>
                  {anime?.release_date ? new Date(anime.release_date).toLocaleDateString() : 'N/A'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite animes added yet.</p>
        )}

        <h3>Mangas</h3>
        {mangas.length > 0 ? (
          <ul className={styles.favoriteItem}>
            {mangas.map((manga: IFavoriItem, index: number) => (
              <li key={index}>
                <h4 style={{ display: 'flex', alignItems: 'center', columnGap: '4px' }}>
                  <Triangle width={16} height={16} opacity={0.9} />
                  {index + 1}
                </h4>
                <span className={styles.itemRow}>
                  <Bunny width={16} height={16} color={'#FFFFFF'} opacity={0.9} />
                  <h5>Japanese Name:</h5>
                  {manga?.japanese_name || 'No japanese name.'}
                </span>
                <span className={styles.itemRow}>
                  <English width={16} height={16} color={'#FFFFFF'} opacity={0.9} />
                  <h4>English Name:</h4>
                  {manga?.english_name || 'No English name.'}
                </span>
                <span className={styles.itemRow}>
                  <Calendar width={16} height={16} color={'#FFFFFF'} opacity={0.9} />
                  <h5>Release Date:</h5>
                  {manga?.release_date ? new Date(manga.release_date).toLocaleDateString() : 'N/A'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite mangas added yet.</p>
        )}
      </article>
    </>
  );
};

const Page = () => {
  const [isFollowModalOpen, setFollowModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<0 | 1>(0);
  const [tabState, setTabState] = useState<number>(0);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

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

  const entries = [...Array(15)].map((_, index) => ({
    key: index,
    title: `Entry Title ${index + 1}`,
    snippet: `This is a short snippet for entry ${index + 1}.`,
    date: `2025-03-3${index % 10}`,
    username: `User${index + 1}`,
  }));

  // TODO: Mock DATAS.
  const DUMMY_USER = 'Dummy';
  const mockAnimes: IFavoriItem[] = [
    {
      japanese_name: '進撃の巨人',
      english_name: 'Attack on Titan',
      release_date: new Date('2013-04-07'),
    },
    {
      japanese_name: '鬼滅の刃',
      english_name: 'Demon Slayer',
      release_date: new Date('2019-04-06'),
    },
  ];

  const mockMangas: IFavoriItem[] = [
    {
      japanese_name: 'ワンピース',
      english_name: 'One Piece',
      release_date: new Date('1997-07-22'),
    },
    {
      japanese_name: '進撃の巨人',
      english_name: 'Attack on Titan',
      release_date: new Date('2009-09-09'),
    },
  ];
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
            <Tooltip text={'X Profile'} position={'top'}>
              <a href={`https://x.com/test`} target='_blank' rel='noopener noreferrer'>
                <X width={16} height={16} color={'#FFFFFF'} />

                <span>--</span>
              </a>
            </Tooltip>

            <Tooltip text={'Mal Profile'} position={'top'}>
              <a href={`https://snapchat.com/test`} target='_blank' rel='noopener noreferrer'>
                <Mal width={16} height={16} color={'#FFFFFF'} />
                <span>--</span>
              </a>
            </Tooltip>

            <Tooltip text={'Reddit Profile'} position={'top'}>
              <a href={`https://instagram.com/test`} target='_blank' rel='noopener noreferrer'>
                <Reddit width={16} height={16} color={'#FFFFFF'} />
                <span>--</span>
              </a>
            </Tooltip>
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

        <TabChanger
          activeTab={tabState}
          setActiveTab={setTabState}
          setAlertModal={setIsAlertModalOpen}
          setReportModal={setIsReportModalOpen}
        />

        {tabState === 0 && <BiographySection />}

        {tabState === 1 && <AboutSection generation={1} countryCode={'CN'} joinDate={new Date()} />}

        {tabState === 2 && <FavoriteSection animes={mockAnimes} mangas={mockMangas} />}
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

      {/* Modals */}
      <FollowModal
        isOpen={isFollowModalOpen}
        onClose={() => setFollowModalOpen(false)}
        followers={followers}
        following={following}
        type={modalType}
      />

      <AlertModal
        isOpen={isAlertModalOpen}
        title='Confirm Block Action'
        text={`Are you sure you want to block ${DUMMY_USER}?`}
        onClose={() => setIsAlertModalOpen(false)}
        callBack={() => {
          setIsAlertModalOpen(false);
        }}
      />

      <ReportModal
        type={1}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        callBack={() => {
          setIsAlertModalOpen(false);
        }}
      />
    </>
  );
};

export default Page;
