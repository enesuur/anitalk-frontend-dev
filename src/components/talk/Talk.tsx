'use client';
import React, { useMemo, useEffect, useCallback, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  UpVote,
  DownVote,
  Report as ReportIcon,
  Share as ShareIcon,
  Copy,
  XVariant,
  Reddit,
} from '@/assets/icons';
import { ITalk as ITalkProps } from '@/types/global';
import { H2 } from '@/shared/ui/headings';
import { PLACE_HOLDERS } from '@/helpers/constants';
import ReportModal from '../modals/report/ReportModal';
import Tooltip from '@/shared/ui/tooltip/Tooltip';
import Sonner from '@/shared/ui/sonner/Sonner';
import { iconStyles } from '@/helpers';
import { remoteInstance } from '@/http/axios';
import styles from './Talk.module.css';

const Talk: React.FC<ITalkProps> = ({
  _id,
  title,
  snippet,
  date,
  username,
  upvote = 32,
  downvote = 14,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isShareBoxOpen, setIsShareBoxOpen] = useState<boolean>(false);
  const [toast, setToast] = useState({ open: false, title: '', message: '' });
  const shareRef = useRef<HTMLDivElement | null>(null);
  const talkRef = useRef<HTMLDivElement | null>(null);

  const shareUrl = useMemo(() => {
    if (typeof window !== 'undefined' && _id) {
      const base = window.location.origin + window.location.pathname;
      return `${base}#talk-${_id}`;
    }
    return '';
  }, [_id]);

  const handleCopyLink = useCallback(() => {
    if (shareUrl) {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          setToast({
            open: true,
            title: 'Copied!',
            message: 'The link has been copied to your clipboard.',
          });
        })
        .catch(() => {
          setToast({
            open: true,
            title: 'Error',
            message: 'Failed to copy the link.',
          });
        });
    }
    setIsShareBoxOpen(false);
  }, [shareUrl]);

  const handleShareOnX = useCallback(() => {
    const tweetText = `💥 Even Saitama would've regrown his hair after reading this madness 🤯
👇 Tap and witness the legend:
`;

    const tweetUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(
      shareUrl,
    )}&text=${encodeURIComponent(tweetText)}`;

    const width = 600;
    const height = 400;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    window.open(
      tweetUrl,
      '_blank',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=no,resizable=no`,
    );
    setIsShareBoxOpen(false);
  }, [shareUrl]);

  const handleShareOnReddit = useCallback(() => {
    const redditTitle = `💬 I just witnessed peak internet on AniTalk 🤯💀 Come see this chaos unfold:`;
    const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(
      shareUrl,
    )}&title=${encodeURIComponent(redditTitle)}`;

    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    window.open(
      redditUrl,
      '_blank',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=no,resizable=no`,
    );
    setIsShareBoxOpen(false);
  }, [shareUrl]);

  const handleUpvote = useCallback(() => {
    console.log('first');
  }, []);

  const handleDownvote = useCallback(() => {
    console.log('second');
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setIsShareBoxOpen(false);
      }
    };

    if (isShareBoxOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShareBoxOpen]);

  const dummyAvatar = PLACE_HOLDERS.avatar_url || 'https://picsum.photos/200/300';
  const dummyDate = new Date(date).toLocaleDateString();

  return (
    <article className={styles.talkBox} ref={talkRef}>
      <div className={styles.headerBox}>
        <div className={styles.linkBox}>
          <H2>
            <Link href='#'>{title}</Link>
          </H2>
          <div className={styles.shareWrapper}>
            <div className={styles.actionBox}>
              <Tooltip text='Report Talk'>
                <ReportIcon onClick={() => setIsReportModalOpen(true)} />
              </Tooltip>
              <Tooltip text='Share'>
                <ShareIcon onClick={() => setIsShareBoxOpen((prev) => !prev)} />
              </Tooltip>

              {isShareBoxOpen && (
                <div ref={shareRef} className={styles.shareWrapper}>
                  <div className={styles.shareBox}>
                    <button aria-label='copy-link' onClick={handleCopyLink}>
                      <Copy {...iconStyles} />
                      Share link
                    </button>
                    <button aria-label='share-twitter' onClick={handleShareOnX}>
                      <XVariant {...iconStyles} />
                      Share on X
                    </button>
                    <button aria-label='share-reddit' onClick={handleShareOnReddit}>
                      <Reddit {...iconStyles} />
                      Share on Reddit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <p>{snippet}</p>
      </div>
      <div className={styles.footerBox}>
        <div className={styles.boxLeft}>
          <div className={styles.voteBox}>
            <span className={styles.countBox}>{upvote}</span>
            <Tooltip text='Upvote'>
              <UpVote role='button' aria-label='Upvote the talk' onClick={handleUpvote} />
            </Tooltip>
          </div>
          <div className={styles.voteBox}>
            <span className={styles.countBox}>{downvote}</span>
            <Tooltip text='Downvote'>
              <DownVote role='button' aria-label='Down vote the talk' onClick={handleDownvote} />
            </Tooltip>
          </div>
        </div>
        <div className={styles.boxRight}>
          <picture>
            <Image
              src={dummyAvatar}
              alt={`${username}'s avatar`}
              width={36}
              height={36}
              className={styles.avatar}
            />
          </picture>
          <Link href={`/user/${username}`} target='_blank' className={styles.username}>
            {username}
          </Link>
          <span className={styles.date}>{dummyDate}</span>
        </div>
      </div>

      <ReportModal
        isOpen={isReportModalOpen}
        type={1}
        callBack={() => console.log('yu')}
        onClose={() => setIsReportModalOpen(false)}
      />

      <Sonner
        isOpen={toast.open}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast({ ...toast, open: false })}
        position='top-center'
      />
    </article>
  );
};

export default React.memo(Talk);
