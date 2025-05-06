import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PLACE_HOLDERS } from '@/helpers/constants';
import { H3, H4 } from '@/shared/ui/headings';
import { Chat } from '@/assets/icons';
import { IBlog } from '@/types/global';
import styles from './styles.module.css';
import { truncateWithTrail } from '@/helpers';

const TrendCard = ({ blog }: { blog: IBlog }) => {
  return (
    <Link
      href={`/blogs/${blog.slug || PLACE_HOLDERS.fallback_blog_slug}`}
      className={styles.cardBox}
    >
      <figure className={styles.leftBox}>
        <picture>
          <Image
            alt={blog.title || PLACE_HOLDERS.fallback_img_alt}
            src={blog.img_url || PLACE_HOLDERS.background_cover_url}
            fill={true}
          />
        </picture>
      </figure>

      <div className={styles.rightBox}>
        <H4 style={{ margin: 0 }}>
          {truncateWithTrail(blog.title, 50) || PLACE_HOLDERS.blog_title}
        </H4>
        <div className={styles.bottomBox}>
          <Chat />
          <span>{blog?.comments?.length || PLACE_HOLDERS.fallback_comment_count}</span>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(TrendCard);
