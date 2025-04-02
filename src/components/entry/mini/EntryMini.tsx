'use-client';
import React from 'react';
import styles from './EntryMini.module.css';
import Link from 'next/link';

interface IEntryMiniProps {
  username: string;
  topicSnippet: string;
  link: string;
}

const EntryMini: React.FC<IEntryMiniProps> = ({ username, topicSnippet, link }) => {
  return (
    <Link href={link} className={styles.entryMiniContainer}>
      <h3 className={styles.snippetText}>{topicSnippet}</h3>
      <p className={styles.infoContainer}>
        <span className={styles.username}>{username}</span>
      </p>
    </Link>
  );
};

export default React.memo(EntryMini);
