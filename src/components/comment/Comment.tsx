'use client';
import React, { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { UpVote, DownVote, Date as DateIcon } from '@/assets/icons';
import styles from './Comment.module.css';
import Link from 'next/link';

interface ICommentProps {
  _id?: string;
  text: string;
  date: Date;
  username: string;
  avatar_url: string | null;
  upVote: number;
  downVote: number;
}

interface IconStyle {
  width: number | string;
  height: number | string;
  color?: string;
  opacity?: number;
}

const ICON_STYLE: IconStyle = {
  width: 16,
  height: 16,
  color: '#FFFFFF',
  opacity: 0.8,
};

const Comment: React.FC<ICommentProps> = ({
  text,
  date,
  username,
  avatar_url,
  upVote,
  downVote,
}) => {
  const STEP = 1000;
  const [charLimit, setCharLimit] = useState(STEP);

  const { visibleText, canReadMore } = useMemo(() => {
    const visibleText = text.slice(0, charLimit);
    const canReadMore = text.length > charLimit;

    return { visibleText, canReadMore };
  }, [text, charLimit]);

  const handleReadMore = useCallback(() => {
    setCharLimit((prev) => Math.min(prev + STEP, text.length));
  }, [text.length]);
  return (
    <div className={styles.commentCard}>
      <div className={styles.commentHeader}>
        <Link href={`/user/${username}`}>
          <figure>
            <Image
              src={avatar_url || '/img/avatar.webp'}
              alt={`${username}'s avatar`}
              fill
              quality={90}
            />
          </figure>
        </Link>
        <div className={styles.commentBox}>
          <Link href={`/user/${username}`}>@{username}</Link>
          <p className={styles.commentText}>
            {visibleText}
            {canReadMore && (
              <>
                ...{' '}
                <span
                  role={'button'}
                  tabIndex={0}
                  onClick={handleReadMore}
                  onKeyDown={(e) => e.key === 'Enter' && handleReadMore()}
                  className={styles.readMore}
                >
                  Read more
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className={styles.commentFooter}>
        <div className={styles.voteContainer}>
          <div className={styles.voteBox}>
            <UpVote {...ICON_STYLE} />
            <span>+{upVote}</span>
          </div>

          <div className={styles.voteBox}>
            <DownVote {...ICON_STYLE} />
            <span>-{downVote}</span>
          </div>
        </div>

        <div className={styles.dateContainer}>
          <DateIcon {...ICON_STYLE} />
          <span>{date.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Comment);
