'use client';
import React from 'react';
import { IBlog } from '@/types/global';
import Link from 'next/link';
import Image from 'next/image';
import { PLACE_HOLDERS } from '@/helpers/constants';
import { H3 } from '@/shared/ui/headings';
import { truncateWithTrail } from '@/helpers';
import useIsMounted from '@/hooks/useIsMounted';
import Divider from '@/shared/ui/hr/Divider';
import { Timer } from 'lucide-react';
import styles from './styles.module.css';

type BlogCardProps = Pick<IBlog, 'slug' | 'title' | 'snippet' | 'img_url' | 'read_time'>;

const BlogCardVariant = ({ blog }: { blog: BlogCardProps }) => {
  const isMounted = useIsMounted();

  const title = blog.title || PLACE_HOLDERS.fallback_blog_title;
  const snippet = blog.snippet || PLACE_HOLDERS.fallback_blog_title;
  const imgUrl = blog.img_url || PLACE_HOLDERS.background_cover_url;
  const readTime = blog.read_time ?? PLACE_HOLDERS.fallback_read_time;
  const readTimeUnit = readTime % 2 === 0 ? 'mins' : 'min';
  if (!isMounted) return null;

  return (
    <Link href={`blogs/${blog.slug}`} className={styles.cardBox}>
      <picture>
        <Image alt={`${title} image.`} src={imgUrl} fill />
      </picture>

      <article className={styles.contentBox}>
        <H3>{truncateWithTrail(title, 55)}</H3>
        <p>{truncateWithTrail(snippet, 40)}</p>
      </article>

      <Divider />

      <div className={styles.footerBox}>
        <p className={styles.readBox}>
          <Timer />
          <span>
            {readTime} {readTimeUnit}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default React.memo(BlogCardVariant);
