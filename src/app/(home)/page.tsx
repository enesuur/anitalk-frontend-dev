import React from 'react';
import Sidebar from './_components/sidebar/Sidebar';
import Home from './_styles/Home.module.css';
import Topbar from './_components/topbar/Topbar';
import styles from './_styles/Home.module.css';
import Composer from './_components/composer/Composer';

/* TODO: Tabstate indicates the following sections 
-1. Feed Section
0. Hot Section
1. New Section (24 hours)
*/

const HomePage: React.FC = () => {
  return (
    <>
      <section>
        <Topbar />
      </section>

      <section>
        <article className={`${styles.heroContainer} container`}>
          <Sidebar />
          <Composer />
        </article>
      </section>
    </>
  );
};

export default HomePage;
