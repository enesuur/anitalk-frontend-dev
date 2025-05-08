'use client';
import React from 'react';
import { IBlog } from '@/types/global';
import NotFound from '@/shared/ui/not-found/NotFound';
import { TrendingUp } from 'lucide-react';
import TrendCard from '../trend-card/TrendCard';
import { H2 } from '@/shared/ui/headings';
import clsx from '@/lib/cn';
import styles from './styles.module.css';

interface ITrendingBlogsProps {
  trending_blogs: IBlog[];
  containerClassname?: string;
  contentClassname?: string;
  containerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

const TrendingBlogs: React.FC<ITrendingBlogsProps> = ({
  trending_blogs,
  containerClassname,
  contentClassname,
  containerStyle,
  contentStyle,
}) => {
  return (
    <aside className={clsx(styles.asideBox, containerClassname)} style={containerStyle}>
      {trending_blogs.length === 0 ? (
        <NotFound text='No trending blogs found' />
      ) : (
        <div className={clsx(contentClassname)} style={contentStyle}>
          <div className={styles.headerBox}>
            <TrendingUp />
            <H2 style={{ margin: 0 }}>Trending blogs</H2>
          </div>
          <div className={styles.cardsWrapper}>
            {trending_blogs.map((blog, index) => (
              <TrendCard key={index} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default TrendingBlogs;
