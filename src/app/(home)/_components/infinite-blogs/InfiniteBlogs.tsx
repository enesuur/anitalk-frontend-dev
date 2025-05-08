'use client';
import React, { useCallback } from 'react';
import { iconStyles } from '@/helpers';
import { H1, H2 } from '@/shared/ui/headings';
import Button from '@/shared/ui/button/Button';
import { useRouter } from 'next/navigation';
import { Filter } from 'lucide-react';
import { IBlog } from '@/types/global';
import BlogCardVariant from '../blog-card-variant/BlogCardVariant';
import TrendingBlogs from '../trending-blogs/TrendingBlogs';
import styles from './styles.module.css';

interface InfiniteBlogsProps {
  infinite_blogs: IBlog[];
  trending_blogs: IBlog[];
}

const InfiniteBlogs: React.FC<InfiniteBlogsProps> = ({ infinite_blogs, trending_blogs }) => {
  const router = useRouter();

  const handleFilterNavigation = useCallback(() => {
    router.push('/filter-blogs');
  }, [router]);

  return (
    <div>
      <H1 style={{ lineHeight: 0, margin: '32px 0 ' }}>
        Dive into <span className='highlight-text'>amazing</span> blogs
      </H1>
      <Button
        icon={<Filter {...iconStyles} />}
        text='Filter Blogs'
        onClick={handleFilterNavigation}
        containerClassname={styles.btnFilter}
      />
      <div className={styles.fancyBlogBox}>
        <div className={styles.infiniteBlogBox}>
          {infinite_blogs.map((item: IBlog, idx: number) => (
            <BlogCardVariant key={idx} blog={item} />
          ))}
        </div>
        <TrendingBlogs trending_blogs={trending_blogs} containerClassname={styles.trendingBox} />
      </div>
    </div>
  );
};

export default InfiniteBlogs;
