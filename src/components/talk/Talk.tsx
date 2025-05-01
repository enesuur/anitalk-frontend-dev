'use client';
import React, { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UpVote, DownVote } from '@/assets/icons';
import styles from './Talk.module.css';
import { ITalk as ITalkProps } from '@/types/global';
import { iconStyles } from '@/helpers';

const Talk: React.FC<ITalkProps> = ({
  title,
  snippet,
  date,
  username,
  upvote = 32,
  downvote = 14,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const COUNT = useMemo(() => {
    const diff = upvote - downvote;
    return diff > 0 ? `+${diff}` : `${diff}`;
  }, [upvote, downvote]);

  if (!isMounted || !date) return null;

  return (
    <article className={styles.entryContainer}>
      <div className={styles.entryHeader}>
        <h2>
          <Link href='#'>{title}</Link>
        </h2>
        <p>{snippet}</p>
      </div>
      <div className={styles.entryFooter}>
        <div className={styles.footerLeft}>
          <span className={styles.countBox}>{COUNT}</span>
          <div className={styles.voteBox}>
            <UpVote {...iconStyles} />
          </div>
          <div className={styles.voteBox}>
            <DownVote {...iconStyles} />
          </div>
        </div>
        <div className={styles.footerRight}>
          <picture>
            <Image
              src={'https://picsum.photos/200/300'}
              alt={`${username}'s avatar`}
              width={32}
              height={32}
              className={styles.avatar}
            />
          </picture>
          <Link href={`/user/${username}`} target='_blank' className={styles.username}>
            {username}
          </Link>
          <span className={styles.date}>{date.toLocaleDateString()}</span>
        </div>
      </div>
    </article>
  );
};

export default React.memo(Talk);
