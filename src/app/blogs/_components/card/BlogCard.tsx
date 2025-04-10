'use client';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './BlogCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Profile, Date as DateIcon } from '@/assets/icons';
import { truncateWithTrail } from '../../_helpers/index';

interface IBlogCardProps {
  _id: string;
  title: string;
  snippet: string;
  date: Date;
  img_url: string;
  author: string;
  slug?: string;
}

const BlogCard: React.FC<IBlogCardProps> = ({
  _id,
  title,
  snippet,
  date,
  img_url,
  author,
  slug = '#',
}) => {
  const router = useRouter();

  const handleNavigation = useCallback(
    (destination: string) => {
      router.push(destination);
    },
    [router],
  );

  return (
    <div role={'link'} className={styles.cardContainer}>
      <figure role={'link'} className={styles.imageWrapper} onClick={() => handleNavigation(slug)}>
        <Image src={img_url || '/img/bg-cover.webp'} alt={title} width={400} height={250} />
      </figure>

      <div className={styles.cardContent}>
        <h3 className={styles.title}>
          <Link href={slug}>{truncateWithTrail(title, 50)}</Link>
        </h3>

        <p className={styles.snippet}>{truncateWithTrail(snippet, 250)}</p>
        <div className={styles.cardFooter}>
          <div
            role={'link'}
            className={`${styles.footerBox} ${styles.left}`}
            onClick={() => handleNavigation(`/user/${author}`)}
          >
            <Profile />
            <span>{truncateWithTrail(author, 11)}</span>
          </div>
          <div className={styles.footerBox}>
            <DateIcon />
            <span>{date.toDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BlogCard);
