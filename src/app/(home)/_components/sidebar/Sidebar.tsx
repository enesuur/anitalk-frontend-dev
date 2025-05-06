'use client';
import React, { useState, useEffect } from 'react';
import MiniTalk from '@/components/entry/mini/MiniTalk';
import { IMiniTalk } from '@/types/global';
import { generateMiniTalk } from '@/data';
import { H2 } from '@/shared/ui/headings';
import { TrendingUp } from 'lucide-react';
import NotFound from '@/shared/ui/not-found/NotFound';
import { iconStyles } from '@/helpers';
import styles from './Sidebar.module.css';

const MINI_TALKS = generateMiniTalk(25);

// TODO: Loading state
const Sidebar = () => {
  //  TODO: Custom global hook.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <aside className={styles.sidebarBox}>
      <div className={styles.headerBox}>
        <TrendingUp {...iconStyles} />
        <H2>Trending talks</H2>
      </div>
      <div className={styles.scrollWrapper}>
        {MINI_TALKS.length > 0 ? (
          <ul className={styles.sidebarList}>
            {MINI_TALKS.map((talk: IMiniTalk, index: number) => (
              <li key={talk._id} className={styles.sidebarItem}>
                <MiniTalk
                  _id={talk._id}
                  key={index}
                  title={talk.title}
                  slug={talk.slug}
                  comment_count={talk.comment_count}
                />
              </li>
            ))}
          </ul>
        ) : (
          <NotFound text='Talks' />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
