'use client';
import React from 'react';
import { IBlog } from '@/types/global';
import Link from 'next/link';
import Image from 'next/image';
import { PLACE_HOLDERS } from '@/helpers/constants';
import { H2 } from '@/shared/ui/headings';
import { truncateWithTrail } from '@/helpers';
import useIsMounted from '@/hooks/useIsMounted';
import Divider from '@/shared/ui/hr/Divider';
import BlogLabel from '@/shared/ui/blog-label/BlogLabel';
import { Timer } from 'lucide-react';
import styles from './styles.module.css';

type BlogCardProps = Readonly<
  Pick<IBlog, 'slug' | 'title' | 'snippet' | 'img_url' | 'read_time' | 'label'>
>;

const BlogCardVariant = ({ blog }: { blog: BlogCardProps }) => {
  const isMounted = useIsMounted();

  const content = {
    title: blog.title || PLACE_HOLDERS.fallback_blog_title,
    snippet: blog.snippet || PLACE_HOLDERS.fallback_blog_title,
    imgUrl: blog.img_url || PLACE_HOLDERS.background_cover_url,
    readTime: blog.read_time ?? PLACE_HOLDERS.fallback_read_time,
  } as const;

  const readTimeUnit = content.readTime % 2 === 0 ? 'mins' : 'min';

  if (!isMounted) return null;

  return (
    <Link href={`blogs/${blog.slug}`} className={styles.cardBox}>
      <picture>
        <Image alt={`${content.title} image.`} src={content.imgUrl} fill />
      </picture>

      <article className={styles.contentBox}>
        <H2>{truncateWithTrail(content.title, 55)}</H2>
        <p>{truncateWithTrail(content.snippet, 100)}</p>
      </article>

      <Divider />

      <div className={styles.footerBox}>
        <BlogLabel label={blog.label} />
        <p className={styles.readBox}>
          <Timer />
          <span>
            {content.readTime} {readTimeUnit}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default React.memo(BlogCardVariant);
