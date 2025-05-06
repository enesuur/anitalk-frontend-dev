import React from 'react';
import Sidebar from './_components/sidebar/Sidebar';
import Topbar from './_components/topbar/Topbar';
import Composer from './_components/composer/Composer';
import Hero from './_components/hero/Hero';
import TrendingBlogs from './_components/trending-blogs/TrendingBlogs';
import { generateMockBlogs } from '@/data';
import styles from './_styles/Home.module.css';

/* NOTE: Tabstate indicates the following sections 
-1. Feed Section
0. Hot Section
1. New Section (24 hours)
*/

const mockBlogs = generateMockBlogs(5);
const trending_blogs = generateMockBlogs(25);

const HomePage = () => {
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
      <section>
        <article className={`${styles.heroContainer} container`}>
          <Sidebar />
          {/* <Composer /> */}
          {/* <TrendingBlogs trending_blogs={trending_blogs} /> */}
        </article>
      </section>
    </React.Fragment>
  );
};

export default HomePage;
