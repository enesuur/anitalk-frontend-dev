'use client';
import React, { useCallback, useReducer, useState } from 'react';
import Image from 'next/image';
import styles from '../_styles/User.module.css';
import Link from 'next/link';
import { X, Mal, Reddit, Bunny } from '@/assets/icons/index';
import FollowModal from '@/components/modals/follow/FollowModal';
import { PartialUser } from '@/types/user';
import Button from '@/shared/ui/button/Button';
import {
  User,
  Info,
  Star,
  UserPlus,
  Flag as FlagIcon,
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
import { H2, H3 } from '@/shared/ui/headings';
import CountryFlag from '@/shared/ui/country-flags/Flag';
import { iconStyles, truncateWithTrail } from '@/helpers';
import Activities from '../_components/activities/Activities';
import { generateMockComments, generateMockTalks } from '@/data/index';
import Badge from '@/shared/ui/member-badges/Badge';
import { PLACE_HOLDERS } from '@/helpers/constants';
import ScrollToTop from '@/shared/ui/scroller/Scroller';

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

const comments = generateMockComments(5);
const talks = generateMockTalks(4);

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
    { label: 'Report', icon: <FlagIcon size={ICON_SIZE} /> },
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
/* --- Biography Section Start ---*/
interface IBiographySectionProps {
  biography: string | null;
}

const BiographySection: React.FC<IBiographySectionProps> = ({ biography }) => {
  return (
    <React.Fragment>
      <H2>Biography</H2>
      <div className={styles.biographyBox}>
        <div>
          {biography ||
            'Just a casual anime enthusiast here! Catch me geeking out over my favorite series and discovering new ones. 🎬🍥 '}
        </div>
      </div>
    </React.Fragment>
  );
};
/* --- Biography Section End ---*/

/* --- About Section Start ---*/

interface IAboutSectionProps {
  country_code: string;
  generation: number;
  join_date: Date | null;
}

const AboutSection: React.FC<IAboutSectionProps> = ({
  country_code = 'TR',
  generation,
  join_date,
}: IAboutSectionProps) => {
  const formattedDate = join_date?.toLocaleDateString() ?? new Date().toLocaleDateString();

  return (
    <React.Fragment>
      <H2>About</H2>
      <div className={styles.aboutBox}>
        <article className={styles.contentBox}>
          <div className={styles.leftBox}>
            <p className={styles.labelBox}>
              <Book {...iconStyles} />
              <span>Generation</span>
            </p>
            <p className={styles.labelBox}>
              <Globe {...iconStyles} />
              <span>Country</span>
            </p>
            <p className={styles.labelBox}>
              <Calendar {...iconStyles} />
              <span>Joined At</span>
            </p>
          </div>

          <div className={styles.rightBox}>
            <p>{generation}</p>
            <p>
              <CountryFlag country_code={country_code.toUpperCase()} size={16} />
              <span className={styles.countryCodeText}>{country_code.toUpperCase()}</span>
            </p>
            <p>{formattedDate}</p>
          </div>
        </article>
      </div>
    </React.Fragment>
  );
};

/* --- About Section end --- */

interface IFavoriteSectionProps {
  favorite_anime: string | null;
  favorite_manga: string | null;
}

const FavoriteSection: React.FC<IFavoriteSectionProps> = ({ favorite_anime, favorite_manga }) => {
  return (
    <React.Fragment>
      <H2>Favorites</H2>
      <div className={styles.favoriteBox}>
        <article className={styles.verticalBox}>
          <H3 style={{ margin: 0 }}>Anime</H3>
          <div className={styles.horizontalBox}>
            <Bunny {...iconStyles} />
            <span>{favorite_anime || 'Not filled'}</span>
          </div>

          <H3 style={{ margin: 0 }}>Manga</H3>
          <div className={styles.horizontalBox}>
            <Book {...iconStyles} />
            <span>{favorite_manga || 'Not filled'}</span>
          </div>
        </article>
      </div>
    </React.Fragment>
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

  // TODO: Mock DATAS.

  // TODO: PlaceHolder'ı kullan
  const DUMMY_USER = 'Dummy';

  const imgUrl = 'https://picsum.photos/200/300' || PLACE_HOLDERS.avatar_url;

  return (
    <React.Fragment>
      <section>
        <div className='container'>
          <div className={styles.showcaseBox}>
            <div className={styles.bannerBox}>
              <Image
                src={'https://picsum.photos/1920/1080'}
                alt='profile banner'
                layout='fill'
                objectFit='cover'
              />
            </div>
            <div className={styles.profileAvatar}>
              <Image
                src={'https://picsum.photos/1920/1080'}
                alt='avatar'
                width={128}
                height={128}
                className={styles.avatarImg}
              />
              <div className={styles.userBox}>
                <Link href={`/user/baladriel`}>@baladriel</Link>
                <Badge type={-3} />
              </div>
            </div>
          </div>

          <div className={styles.profileInfoBox}>
            <div className={styles.profileSocialBox}>
              <Tooltip text={'X Profile'} position={'top'}>
                <a href={`https://x.com/test`} target='_blank' rel='noopener noreferrer'>
                  <X {...iconStyles} />
                  <span>{truncateWithTrail('baladriel')}</span>
                </a>
              </Tooltip>

              <Tooltip text={'Mal Profile'} position={'top'}>
                <a href={`https://snapchat.com/test`} target='_blank' rel='noopener noreferrer'>
                  <Mal {...iconStyles} />
                  <span>{truncateWithTrail('baladriel')}</span>
                </a>
              </Tooltip>

              <Tooltip text={'Reddit Profile'} position={'top'}>
                <a href={`https://instagram.com/test`} target='_blank' rel='noopener noreferrer'>
                  <Reddit {...iconStyles} />
                  <span>{truncateWithTrail('baladriel')}</span>
                </a>
              </Tooltip>
            </div>

            <div className={styles.profileStatBox}>
              <div>
                <span>Talks</span>
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

          {tabState === 0 && <BiographySection biography={null} />}

          {tabState === 1 && <AboutSection generation={1} country_code={'FR'} join_date={null} />}

          {tabState === 2 && (
            <FavoriteSection favorite_anime={'Attack on Titan'} favorite_manga={'One Punch Man'} />
          )}
        </div>
      </section>

      {/* TabState changer && talk to comments. && needs to follow for seeing talks and comments. */}
      <section>
        <div className={`${styles.activityBox} container`}>
          <Activities talks={talks} comments={comments} />
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
      <ScrollToTop />
    </React.Fragment>
  );
};

export default Page;
