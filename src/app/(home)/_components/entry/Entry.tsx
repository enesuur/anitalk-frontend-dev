import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { faker } from '@faker-js/faker';
import styles from './Entry.module.css';

interface IEntryProps {
  title: string;
  snippet: string;
  date: Date;
  username: string;
}

const Entry: React.FC<IEntryProps> = ({ title, snippet, date, username }) => {
  const avatarUrl = faker.image.avatar();

  return (
    <article className={styles.entryContainer}>
      <div className={styles.entryHeader}>
        <h2>
          <Link href={''}>{title}</Link>
        </h2>
        <p>{snippet}</p>
      </div>
      <div className={styles.entryFooter}>
        <div className={styles.footerLeft}>
          <picture>
            <Image
              src={'https://picsum.photos/200/300'}
              alt={`${username}'s avatar`}
              width={40}
              height={40}
              className={styles.avatar}
            />
          </picture>
          <Link href={`/user/${username}`} className={styles.username}>
            {username}
          </Link>
        </div>
        <span className={styles.date}>{3}</span>
      </div>
    </article>
  );
};

export default React.memo(Entry);
