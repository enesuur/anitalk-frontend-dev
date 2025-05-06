'use-client';
import React from 'react';
import { IMiniTalk } from '@/types/global';
import { truncateWithTrail } from '@/helpers';
import { H4 } from '@/shared/ui/headings';
import { Chat } from '@/assets/icons';
import { PLACE_HOLDERS } from '@/helpers/constants';
import Link from 'next/link';
import styles from './styles.module.css';

const MiniTalk: React.FC<IMiniTalk> = ({ title, slug, comment_count }: IMiniTalk) => {
  return (
    <Link
      href={`/talks/${slug}` || PLACE_HOLDERS.fallback_blog_slug}
      className={styles.miniTalkBox}
    >
      <H4 style={{ margin: 0 }}>{truncateWithTrail(title, 50)}</H4>
      <p className={styles.footerBox}>
        <Chat />
        <span>{comment_count}</span>
      </p>
    </Link>
  );
};

export default React.memo(MiniTalk);
