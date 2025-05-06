'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NotFound from '@/shared/ui/not-found/NotFound';
import { IBlog } from '@/types/global';
import { PLACE_HOLDERS } from '@/helpers/constants';
import { truncateWithTrail } from '@/helpers';
import { Timer } from 'lucide-react';
import { H1, H2, H3 } from '@/shared/ui/headings';
import Scroller from '@/shared/ui/scroller/Scroller';
import styles from './Hero.module.css';

interface IHeroProps {
  latest_blogs: IBlog[];
}

const Hero: React.FC<IHeroProps> = ({ latest_blogs }: IHeroProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!latest_blogs || latest_blogs.length < 5) {
    return <NotFound text='Blogs' />;
  }

  if (!setIsMounted) return null;

  return (
    <div>
      <H1>Latest Blogs</H1>
      <div className={styles.heroBox}>
        <Link href={`/blogs/${latest_blogs[0].slug}`} className={styles.leftBox}>
          <picture>
            <Image
              className={styles.leftImg}
              src={latest_blogs[0].img_url || PLACE_HOLDERS.background_cover_url}
              alt={latest_blogs[0].title}
              fill
            />
          </picture>
          <div className={styles.overlay}>
            <H2>{truncateWithTrail(latest_blogs[0].title, 80)}</H2>
            <p className={styles.readBox}>
              <Timer />
              <span>{latest_blogs[0].read_time + ' minutes'}</span>
            </p>
          </div>
        </Link>

        <div className={styles.rightBox} role='group' aria-label='Gallery of four visuals'>
          {latest_blogs.slice(1, 5).map((blog) => (
            <Link href={`/blogs/${blog.slug}`} key={blog._id} className={styles.gridItem}>
              <picture>
                <Image
                  className={styles.rightImg}
                  src={blog.img_url || PLACE_HOLDERS.background_cover_url}
                  alt={blog.title}
                  fill
                />
              </picture>
              <div className={styles.overlay}>
                <H3>{truncateWithTrail(blog.title, 60)}</H3>
                <p className={styles.readBox}>
                  <Timer />
                  <span>{blog.read_time + ' minutes'}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Hero);
