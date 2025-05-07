import React from 'react';
import Sidebar from './_components/sidebar/Sidebar';
import Topbar from './_components/topbar/Topbar';
import Composer from './_components/composer/Composer';
import Hero from './_components/hero/Hero';
import TrendingBlogs from './_components/trending-blogs/TrendingBlogs';
import { generateMockBlogs, generateMockTalks } from '@/data';
import Banner from '@/components/banner/Banner';
import BlogCardVariant from './_components/blog-card-variant/BlogCardVariant';
import clsx from '@/lib/cn';
import { IBlog } from '@/types/global';
import styles from './_styles/Home.module.css';
import { H2 } from '@/shared/ui/headings';

/* NOTE: Tabstate indicates the following sections 
-1. Feed Section
0. Hot Section
1. New Section (24 hours)
*/

const mockBlogs = generateMockBlogs(5);
const trending_blogs = generateMockBlogs(10);
const hot_talks = generateMockTalks(5);
const user_feed_talks = generateMockTalks(5);
const feed_talks = generateMockTalks(5);
const infiniteBlogs = generateMockBlogs(9);

export const revalidate = 60;

const HomePage = async () => {
  return (
    <React.Fragment>
      <section style={{ margin: '0' }}>
        <div className='container'>
          <Topbar />
        </div>
      </section>
      <section>
        <div className={'container'}>
          <Hero latest_blogs={mockBlogs} />
        </div>
      </section>
      <div className={'container'}>
        <Banner text='Advertise Section 1920 x 1080' />
      </div>
      <section>
        <div className={`${styles.mainBox} container`}>
          <Sidebar />
          <Composer
            currentTab={0}
            hot_talks={hot_talks}
            user_feed_talks={user_feed_talks}
            feed_talks={feed_talks}
          />
          <TrendingBlogs trending_blogs={trending_blogs} />
        </div>
      </section>

      <section>
        <div className='container'>
          <H2>
            Dive into <span className='highlight-text'>amazing</span> blogs
          </H2>
          <div className={styles.infiniteBlogBox}>
            {infiniteBlogs.map((item: Partial<IBlog>, idx: number) => (
              <BlogCardVariant key={idx} blog={item} />
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default HomePage;
