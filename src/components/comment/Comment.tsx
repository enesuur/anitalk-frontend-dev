'use client';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  UpVote,
  DownVote,
  Date as DateIcon,
  Share as ShareIcon,
  Report as ReportIcon,
  XVariant,
  Copy,
  Reddit,
} from '@/assets/icons';
import Image from 'next/image';
import Link from 'next/link';
import { iconStyles } from '@/helpers';
import { PLACE_HOLDERS } from '@/helpers/constants';
import { IComment } from '@/types/global';
import ReportModal from '../modals/report/ReportModal';
import Tooltip from '@/shared/ui/tooltip/Tooltip';
import Sonner from '@/shared/ui/sonner/Sonner';
import styles from './Comment.module.css';

/* Constants */
const STEP = 1000;

const Comment: React.FC<IComment> = ({
  _id,
  text,
  date,
  username,
  avatar_url,
  upvote,
  downvote,
}) => {
  const [charLimit, setCharLimit] = useState<number>(STEP);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isShareBoxOpen, setIsShareBoxOpen] = useState<boolean>(false);
  const [toast, setToast] = useState({ open: false, title: '', message: '' });
  const shareRef = useRef<HTMLDivElement | null>(null);
  const commentRef = useRef<HTMLDivElement | null>(null);

  /* 
  Functions
  */
  const { visibleText, canReadMore } = useMemo(() => {
    const visibleText = text.slice(0, charLimit);
    const canReadMore = text.length > charLimit;
    return { visibleText, canReadMore };
  }, [text, charLimit]);

  const handleReadMore = useCallback(() => {
    setCharLimit((prev) => Math.min(prev + STEP, text.length));
  }, [text.length]);

  const shareUrl = useMemo(() => {
    if (typeof window !== 'undefined' && _id) {
      const base = window.location.origin + window.location.pathname;
      return `${base}#comment-${_id}`;
    }
    return '';
  }, [_id]);

  /*
  Scrolls to specific comment through ref and comment's _id.
  */
  const handleScrollToComment = useCallback(() => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

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

  /* 
  Hooks
  */
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

  return (
    <React.Fragment>
      <div id={`comment-${_id}`} className={styles.commentCard} ref={commentRef}>
        <div className={styles.commentHeader}>
          <Link
            href={`/user/${username}`}
            className={styles.imgWrapper}
            data-testid={'#profile_img'}
          >
            <figure>
              <Image
                src={avatar_url || PLACE_HOLDERS.avatar_url}
                alt={`${username}'s avatar`}
                fill
                quality={90}
              />
            </figure>
          </Link>
          <div className={styles.commentBox}>
            <div className={styles.linkBox}>
              <Link href={`/user/${username}`}>@{username}</Link>
              <div className={styles.actionBox}>
                <Tooltip text='Report user'>
                  <ReportIcon {...iconStyles} onClick={() => setIsReportModalOpen(true)} />
                </Tooltip>
                <Tooltip text='Share'>
                  <ShareIcon {...iconStyles} onClick={() => setIsShareBoxOpen((prev) => !prev)} />
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
            <p className={styles.commentText}>
              {visibleText}
              {canReadMore && (
                <>
                  ... handleReport
                  <span
                    role='button'
                    tabIndex={0}
                    onClick={handleReadMore}
                    onKeyDown={(e) => e.key === 'Enter' && handleReadMore()}
                    className={styles.readMore}
                  >
                    Read more
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className={styles.commentFooter}>
          <div className={styles.voteContainer}>
            <div className={styles.voteBox}>
              <UpVote {...iconStyles} />
              <span>+{upvote}</span>
            </div>

            <div className={styles.voteBox}>
              <DownVote {...iconStyles} />
              <span>-{downvote}</span>
            </div>
          </div>

          <div className={styles.dateContainer}>
            <DateIcon {...iconStyles} />
            <span>{date.toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <ReportModal
        isOpen={isReportModalOpen}
        type={0}
        onClose={() => setIsReportModalOpen(false)}
        callBack={() => console.log('test')}
      />

      <Sonner
        isOpen={toast.open}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </React.Fragment>
  );
};

export default React.memo(Comment);
