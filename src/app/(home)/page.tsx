import React from 'react';
import Sidebar from './_components/sidebar/Sidebar';
import Topbar from './_components/topbar/Topbar';
import Composer from './_components/composer/Composer';
import Hero from './_components/hero/Hero';
import { generateMockBlogs, generateMockTalks } from '@/data';
import Banner from '@/components/banner/Banner';
import styles from './_styles/Home.module.css';
import { redirect } from 'next/navigation';
import Scroller from '@/shared/ui/scroller/Scroller';
import InfiniteBlogs from './_components/infinite-blogs/InfiniteBlogs';

/* NOTE: Tabstate indicates the following sections 
-1. Feed Section
0. Hot Section
1. New Section (24 hours)
*/

const mockBlogs = generateMockBlogs(5);
const trending_blogs = generateMockBlogs(5);
const hot_talks = generateMockTalks(5);
const user_feed_talks = generateMockTalks(5);
const feed_talks = generateMockTalks(5);
const infiniteBlogs = generateMockBlogs(9);

export const revalidate = 60;

const HomePage = () => {
  const handleFilterNavigation = () => {
    redirect('/filter-blogs');
  };
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
        </div>
      </section>

      <section>
        <div className='container'>
          <InfiniteBlogs trending_blogs={trending_blogs} infinite_blogs={infiniteBlogs} />
        </div>
      </section>

      <Scroller />
    </React.Fragment>
  );
};

export default HomePage;
