'use client';
import React, { useState, useEffect } from 'react';
import { IBlog } from '@/types/global';
import NotFound from '@/shared/ui/not-found/NotFound';
import { fetchBlogs } from '../../_services/trendingBlogs.service';
import TrendCard from '../trend-card/TrendCard';
import { H2 } from '@/shared/ui/headings';
import { TrendingUp } from 'lucide-react';
import styles from './styles.module.css';

const TrendingBlogs = ({ trending_blogs }: { trending_blogs: IBlog[] }) => {
  return (
    <aside className={styles.asideBox}>
      {trending_blogs.length === 0 ? (
        <NotFound text='Test' />
      ) : (
        <div>
          <div className={styles.headerBox}>
            <TrendingUp />
            <H2 style={{ margin: 0 }}>Trending blogs</H2>
          </div>
          <div className={styles.cardsWrapper}>
            {trending_blogs.map((blog, index: number) => (
              <TrendCard key={index} blog={blog} />
            ))}
          </div>
          {false && <div className={styles.loader}>Loading...</div>}
        </div>
      )}
    </aside>
  );
};

export default TrendingBlogs;
