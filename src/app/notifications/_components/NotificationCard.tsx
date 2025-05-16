import React, { useMemo } from 'react';
import Image from 'next/image';
import { IUser } from '@/types/global';
import { Bolt } from '@/assets/icons';
import { iconStyles } from '@/helpers';
import Link from 'next/link';
import clsx from '@/lib/cn';
import { PLACE_HOLDERS } from '@/helpers/constants';
import styles from './NotificationCard.module.css';

/* 
NOTIFICATION TYPES DIVIDED INTO 3 PARTS
-1 -> UpVote
0 -> Follow
1 -> Comment (based on their profile)
*/

interface INotificationCardProps {
  users: Partial<IUser[]>;
  totalCount: number;
  type: (-1 | 0 | 1) | number;
  target: string;
  date: string | null;
  containerClassname?: string;
  containerStyle?: React.CSSProperties;
}

const NotificationCard: React.FC<INotificationCardProps> = ({
  users,
  totalCount = 0,
  type,
  target,
  date,
}) => {
  const verbMap: Record<number, string> = {
    [-1]: 'upvoted',
    [0]: 'followed',
    [1]: 'commented on',
  };

  const mainVerb = useMemo(() => verbMap[type] || 'interacted with', [type]);

  // usemMemo
  const visibleUsers = users.slice(0, 3);
  const visibleNames = visibleUsers.map((user) => user?.username);
  const remainingCount = totalCount - visibleNames.length;

  const getUserLink = (username: string | undefined) => (
    <Link href={`/user/${username}`} className={styles.usernameLink} target={'_blank'}>
      {username}
    </Link>
  );

  const renderMessage = () => {
    if (totalCount === 1) {
      return (
        <span>
          {getUserLink(visibleNames[0])} {mainVerb} {target}
        </span>
      );
    }

    const namePart: React.ReactNode[] = [];

    visibleNames.forEach((username, index) => {
      namePart.push(<span key={`user-${username}`}>{getUserLink(username)}</span>);

      const isSecondLast = index === visibleNames.length - 2;
      const isLast = index === visibleNames.length - 1;

      if (visibleNames.length === 2 && isSecondLast) {
        namePart.push(<span key={`and-${index}`}> and </span>);
      } else if (visibleNames.length === 3) {
        if (index === 0) {
          namePart.push(<span key={`comma-${index}`}>, </span>);
        } else if (isSecondLast) {
          namePart.push(<span key={`and-${index}`}> and </span>);
        }
      } else if (!isLast && visibleNames.length > 3) {
        namePart.push(<span key={`comma-${index}`}>, </span>);
      }
    });

    if (remainingCount > 0) {
      namePart.push(<span key='more'>{` and +${remainingCount} others`}</span>);
    }

    return (
      <span>
        {namePart}
        <span>
          {' '}
          {mainVerb} {target}!
        </span>
      </span>
    );
  };

  return (
    <div className={clsx(styles.container, 'container')}>
      <div className={styles.avatarBox}>
        <div className={styles.avatarGroup}>
          {visibleUsers.map((user, idx) => (
            <picture key={idx} className={styles.avatarWrapper} style={{ zIndex: 5 - idx }}>
              <Image
                src={user?.avatar_url || PLACE_HOLDERS.avatar_url}
                alt={`${user?.username}'s avatar picture`}
                width={32}
                height={32}
                className={styles.avatar}
              />
            </picture>
          ))}
        </div>
      </div>
      <div className={styles.contentBox}>
        <p className={styles.message}>{renderMessage()}</p>
        <span className={styles.dateBox}>
          <Bolt {...iconStyles} width={12} height={12} />
          {date}
        </span>
      </div>
    </div>
  );
};

export default React.memo(NotificationCard);
