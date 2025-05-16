'use client';
import React, { useState, useMemo } from 'react';
import styles from './Follow.module.css';
import { X, Eraser, Search } from 'lucide-react';
import useDebounce from '@/hooks/useDebounce';
import UserCard from '@/app/user/_components/cards/UserCard';
import { PartialUser } from '@/types/user';
import { NotFound } from '@/assets/icons/index';

interface IFollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  followers?: PartialUser[];
  following?: PartialUser[];
  type: 0 | 1;
}

const FollowModal: React.FC<IFollowModalProps> = ({
  isOpen,
  onClose,
  followers = [],
  following = [],
  type,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const list = type === 0 ? followers : following;

  const filteredList = useMemo(
    () =>
      list.filter((user) =>
        user.username.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      ),
    [list, debouncedSearchTerm],
  );

  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent} id='follow-modal'>
          <div className={styles.modalHeader}>
            <h2>{type === 0 ? 'Followers' : 'Following'}</h2>
            <X
              size={24}
              color={'#FFFFFF'}
              opacity={0.9}
              onClick={onClose}
              className={styles.btnClose}
            />
          </div>

          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={24} opacity={0.9} />
            <input
              type='text'
              placeholder={type === 0 ? 'Search followers...' : 'Search following...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            {searchTerm && (
              <Eraser
                className={styles.clearIcon}
                size={24}
                opacity={0.9}
                onClick={() => setSearchTerm('')}
              />
            )}
          </div>

          <div className={styles.followList}>
            {filteredList.length > 0 ? (
              filteredList.map((user) => (
                <UserCard
                  key={user._id}
                  username={user.username}
                  avatar_url={user.avatar_url}
                  isFollowing={type === 1 || followers.some((f) => f._id === user._id)}
                  onToggleFollow={() => console.log(`Toggle follow for ${user.username}`)}
                />
              ))
            ) : (
              <p className={styles.hintBox}>
                <NotFound width={24} height={24} color={'#FFFFFF'} opacity={0.9} />
                {type === 0 ? 'Followers' : 'Following'} not found.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default React.memo(FollowModal);
