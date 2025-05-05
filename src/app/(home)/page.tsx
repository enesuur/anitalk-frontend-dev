import React from 'react';
import Sidebar from './_components/sidebar/Sidebar';
import Topbar from './_components/topbar/Topbar';
import styles from './_styles/Home.module.css';
import Composer from './_components/composer/Composer';
import Swiper from '@/shared/ui/swiper/Swiper';

/* NOTE: Tabstate indicates the following sections 
-1. Feed Section
0. Hot Section
1. New Section (24 hours)
*/

export const revalidate = 60;

const HomePage: React.FC = async () => {
  return (
    <React.Fragment>
      <section style={{ margin: '0' }}>
        <div className='container'>
          <Topbar />
        </div>
      </section>

      <section>
        <div className={'container'}>
          <Swiper />
        </div>
      </section>

      <section>
        <article className={`${styles.heroContainer} container`}>
          <Sidebar />
          <Composer />
        </article>
      </section>
    </React.Fragment>
  );
};

export default HomePage;
