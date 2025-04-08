import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { faker } from '@faker-js/faker';
import { UpVote, DownVote } from '@/assets/icons';
import styles from './Entry.module.css';

interface IEntryProps {
  title: string;
  snippet: string;
  date: Date;
  username: string;
  count?: number;
}

const Entry: React.FC<IEntryProps> = ({ title, snippet, date, username, count = 132 }) => {
  const avatarUrl = faker.image.avatar();

  const COUNT = useMemo(() => (count > 0 ? `+${count}` : `-${count}`), [count]);

  return (
    <article className={styles.entryContainer}>
      <div className={styles.entryHeader}>
        <h2>
          <Link href="#">{title}</Link>
        </h2>
        <p>{snippet}</p>
      </div>
      <div className={styles.entryFooter}>
        <div className={styles.footerLeft}>
          <span className={styles.countBox}>{COUNT}</span>
          <div className={styles.voteBox}>
            <UpVote width={20} height={20} opacity={0.9} />
          </div>
          <div className={styles.voteBox}>
            <DownVote width={20} height={20} opacity={0.9} />
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
          <Link href={`/user/${username}`} className={styles.username}>
            {username}
          </Link>
          <span className={styles.date}>{date.toISOString()}</span>
        </div>
      </div>
    </article>
  );
};

export default React.memo(Entry);
