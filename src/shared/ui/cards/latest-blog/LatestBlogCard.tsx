'use client';
import React from 'react';
import { H2 } from '@/shared/ui/headings/index';
import Image from 'next/image';
import Link from 'next/link';
import { PLACE_HOLDERS } from '@/helpers/constants';
import { truncateWithTrail } from '@/helpers';
import { Date as DateIcon, Profile } from '@/assets/icons';
import { ArrowRight, Diamond } from 'lucide-react';
import { IBlog } from '@/types/global';
import styles from './styles.module.css';

const LatestBlogCard = ({ _id, title, snippet, date, img_url, author, slug, label }: IBlog) => {
  return (
    <Link href={'#'}>
      {/* LEFT BOX */}
      <article className={styles.cardBox}>
        <div className={styles.imageBox}>
          <picture>
            <Image
              src={img_url || PLACE_HOLDERS.background_cover_url}
              alt={title}
              loading={'lazy'}
              fill={true}
              objectFit={'cover'}
            />
          </picture>
        </div>

        {/* Right Box */}
        <div className={styles.contentBox}>
          <H2 className={styles.title}>{title}</H2>
          <div className={styles.labelBox}>
            <Diamond
              style={{
                fill: label?.color || PLACE_HOLDERS.blog_label_color,
                width: '14px',
                height: '14px',
              }}
            />
            <span>{label.title}</span>
          </div>
          <p className={styles.snippet}>{truncateWithTrail(snippet, 200)}</p>
          <div className={styles.cardFooter}>
            <p className={styles.readmoreBox}>
              <span>Read More</span>
              <ArrowRight />
            </p>
            <div className={styles.infoBox}>
              <p className={styles.horizontalBox}>
                <Profile />
                <span>{author}</span>
              </p>
              <p className={styles.horizontalBox}>
                <DateIcon />
                <span>{date ? date.toLocaleDateString() : new Date().toLocaleString()}</span>
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default React.memo(LatestBlogCard);
