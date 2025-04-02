'use client';
import React from 'react';
import styles from './Sidebar.module.css';
import EntryMini from '@/components/entry/mini/EntryMini';
import { faker } from '@faker-js/faker';

const Sidebar = () => {
  const entries = new Array(50).fill(null).map(() => ({
    username: faker.internet.userName(),
    date: faker.date.past().toLocaleDateString(),
    topicSnippet: faker.lorem.sentence(),
    link: faker.internet.url(),
  }));

  return (
    <aside className={styles.sidebarContainer}>
      <h2>Latest talks</h2>
      <div className={styles.scrollWrapper}>
        {entries.length > 0 ? (
          <ul className={styles.sidebarList}>
            {entries.map((entry, index) => (
              <li key={index} className={styles.sidebarItem}>
                <EntryMini
                  username={entry.username}
                  topicSnippet={entry.topicSnippet}
                  link={entry.link}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noEntries}>No entries available</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
