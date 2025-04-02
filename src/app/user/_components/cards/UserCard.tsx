'use client';
import React, { useCallback } from 'react';
import styles from './UserCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/shared/ui/button/Button';

interface IUserCardProps {
  key: string;
  username: string;
  avatar_url?: string;
  isFollowing: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  onToggleFollow: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const UserCard: React.FC<IUserCardProps> = ({
  username,
  avatar_url,
  isFollowing,
  onToggleFollow,
  isLoading,
  isDisabled,
}) => {
  const handleAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onToggleFollow(e);
    },
    [onToggleFollow]
  );

  return (
    <div className={styles.container}>
      <Link href={`/user/${username}`} className={styles.userLink}>
        <picture>
          <Image
            src={avatar_url || '/default-avatar.png'}
            alt={username}
            width={32}
            height={32}
            className={styles.userAvatar}
          />
        </picture>
        <span className={styles.userName}>@{username}</span>
      </Link>

      <Button
        className={`${styles.followBtn} ${isFollowing ? styles.following : ''}`}
        onClick={handleAction}
        isLoading={true}
        isDisabled={isDisabled}
        style={{flexDirection:'row-reverse'}}
        text={isFollowing ? 'Unfollow' : 'Follow'}
      />
    </div>
  );
};

export default React.memo(UserCard);
