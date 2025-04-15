'use client';
import React, { useState } from 'react';
import styles from './_styles/Page.module.css';
import { IconStyles } from '@/types/global';
import { BellActive, BellOld } from '@/assets/icons/';
import NotificationCard from './_components/NotificationCard';
import { formatDistanceToNow } from 'date-fns'; // date formatting

export const iconStyles: IconStyles = {
  width: 20,
  height: 20,
  opacity: 0.8,
  color: '#FFFFFF',
};

// FAKE TAXI
const recentNotifications = [
  {
    users: [
      { username: 'Galadriel', avatar_url: 'https://avatars.githubusercontent.com/u/1' }
    ],
    totalCount: 1,
    type: 0, // Follow
    target: 'you',
    date: new Date(),
  },
  {
    users: [
      { username: 'Galadriel', avatar_url: 'https://avatars.githubusercontent.com/u/1' },
      { username: 'Guye', avatar_url: 'https://avatars.githubusercontent.com/u/2' }
    ],
    totalCount: 2,
    type: 0, // Follow
    target: 'you',
    date: new Date(),
  },
  {
    users: [
      { username: 'Galadriel', avatar_url: 'https://avatars.githubusercontent.com/u/1' },
      { username: 'Guye', avatar_url: 'https://avatars.githubusercontent.com/u/2' },
      { username: 'Aragorn', avatar_url: 'https://avatars.githubusercontent.com/u/3' }
    ],
    totalCount: 3,
    type: 0, // Follow
    target: 'you',
    date: new Date(),
  },
  {
    users: [
      { username: 'Galadriel', avatar_url: 'https://avatars.githubusercontent.com/u/1' },
      { username: 'Guye', avatar_url: 'https://avatars.githubusercontent.com/u/2' },
      { username: 'Aragorn', avatar_url: 'https://avatars.githubusercontent.com/u/3' },
      { username: 'Legolas', avatar_url: 'https://avatars.githubusercontent.com/u/4' }
    ],
    totalCount: 4,
    type: 0, // Follow
    target: 'you',
    date: new Date(),
  },
  {
    users: [
      { username: 'Galadriel', avatar_url: 'https://avatars.githubusercontent.com/u/1' },
      { username: 'Guye', avatar_url: 'https://avatars.githubusercontent.com/u/2' },
      { username: 'Aragorn', avatar_url: 'https://avatars.githubusercontent.com/u/3' },
      { username: 'Legolas', avatar_url: 'https://avatars.githubusercontent.com/u/4' },
      { username: 'Gimli', avatar_url: 'https://avatars.githubusercontent.com/u/5' }
    ],
    totalCount: 5,
    type: 0, // Follow
    target: 'you',
    date: new Date(),
  },
];

const oldNotifications = [
  {
    users: [
      { username: 'Frodo', avatar_url: 'https://avatars.githubusercontent.com/u/6' }
    ],
    totalCount: 1,
    type: -1, // Upvote
    target: 'your talk on the One Ring',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    users: [
      { username: 'Frodo', avatar_url: 'https://avatars.githubusercontent.com/u/6' },
      { username: 'Samwise', avatar_url: 'https://avatars.githubusercontent.com/u/7' }
    ],
    totalCount: 2,
    type: -1, // Upvote
    target: 'your talk on the One Ring',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    users: [
      { username: 'Frodo', avatar_url: 'https://avatars.githubusercontent.com/u/6' },
      { username: 'Samwise', avatar_url: 'https://avatars.githubusercontent.com/u/7' },
      { username: 'Merry', avatar_url: 'https://avatars.githubusercontent.com/u/8' }
    ],
    totalCount: 3,
    type: -1, // Upvote
    target: 'your talk on the One Ring',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    users: [
      { username: 'Frodo', avatar_url: 'https://avatars.githubusercontent.com/u/6' },
      { username: 'Samwise', avatar_url: 'https://avatars.githubusercontent.com/u/7' },
      { username: 'Merry', avatar_url: 'https://avatars.githubusercontent.com/u/8' },
      { username: 'Pippin', avatar_url: 'https://avatars.githubusercontent.com/u/9' }
    ],
    totalCount: 4,
    type: -1, // Upvote
    target: 'your talk on the One Ring',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    users: [
      { username: 'Frodo', avatar_url: 'https://avatars.githubusercontent.com/u/6' },
      { username: 'Samwise', avatar_url: 'https://avatars.githubusercontent.com/u/7' },
      { username: 'Merry', avatar_url: 'https://avatars.githubusercontent.com/u/8' },
      { username: 'Pippin', avatar_url: 'https://avatars.githubusercontent.com/u/9' },
      { username: 'Gandalf', avatar_url: 'https://avatars.githubusercontent.com/u/10' }
    ],
    totalCount: 5,
    type: -1, // Upvote
    target: 'your talk on the One Ring',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
];


const Page = () => {
  const [tabState, setTabState] = useState<boolean>(false);
  const notifications = tabState ? oldNotifications : recentNotifications;

  return (
    <section>
      <div className='container'>
        <h1 className='h-1' style={{maxWidth:'1024px',margin:'auto'}}>Notifications</h1>

        <nav className={styles.tabContainer}>
          <button
            className={`${styles.btnTab} ${!tabState ? styles.active : ''}`}
            onClick={() => setTabState(false)}
          >
            <BellActive {...iconStyles} />
            Recents
          </button>
          <button
            className={`${styles.btnTab} ${tabState ? styles.active : ''}`}
            onClick={() => setTabState(true)}
          >
            <BellOld {...iconStyles} />
            Olds
          </button>
        </nav>

        <div className={styles.notificationContainer}>
          {notifications.length === 0 ? (
            <div className={styles.noNotification}>
              <p>No {tabState ? 'old' : 'recent'} notifications to show.</p>
            </div>
          ) : (
            notifications.map((item, index) => (
              <NotificationCard
                key={index}
                users={item.users}
                totalCount={item.totalCount}
                type={item.type}
                target={item.target}
                date={formatDistanceToNow(item.date, { addSuffix: true })}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
