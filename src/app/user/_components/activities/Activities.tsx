'use client';
import React from 'react';
import { MessageCircleMore, Podcast } from 'lucide-react';
import { ITalk, IComment } from '@/types/global';
import Talk from '@/components/talk/Talk';
import Comment from '@/components/comment/Comment';
import { NotFound } from '@/assets/icons';
import { iconStyles } from '@/helpers/index';
import Pagination from '@/components/pagination/Pagination';
import styles from './Activities.module.css';
import CommentCount from '@/shared/ui/comment-count/CommentCount';
import Sort from '@/components/sort/Sort';

interface IActivityProps {
  talks: ITalk[];
  callback?: (param?: boolean) => void;
  comments: IComment[];
}

const Activities = ({ talks, comments, callback }: IActivityProps) => {
  const [tabState, setTabState] = React.useState<boolean>(false);
  const [talkPage, setTalkPage] = React.useState<number>(1);
  const [commentPage, setCommentPage] = React.useState<number>(1);

  const handleTabClick = (isCommentTab: boolean) => {
    setTabState(isCommentTab);
    callback?.(isCommentTab);
  };

  const ITEMS_PER_PAGE = 5;

  const talkTotalPages = Math.ceil(talks.length / ITEMS_PER_PAGE);
  const commentTotalPages = Math.ceil(comments.length / ITEMS_PER_PAGE);

  const paginatedTalks = talks.slice((talkPage - 1) * ITEMS_PER_PAGE, talkPage * ITEMS_PER_PAGE);
  const paginatedComments = comments.slice(
    (commentPage - 1) * ITEMS_PER_PAGE,
    commentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className={styles.activityWrapper} suppressHydrationWarning={true}>
      <nav className={styles.navBox} aria-label='Activity Tabs'>
        <ul className={styles.tabBox} role='tablist'>
          <div className={styles.tabIndicator} style={{ left: tabState ? '50%' : '0%' }} />
          <li
            className={`${styles.itemBox} ${!tabState ? styles.active : ''}`}
            onClick={() => handleTabClick(false)}
            role='tab'
            aria-selected={!tabState}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleTabClick(false)}
          >
            <Podcast />
            <span>Talks</span>
          </li>
          <li
            className={`${styles.itemBox} ${tabState ? styles.active : ''}`}
            onClick={() => handleTabClick(true)}
            role='tab'
            aria-selected={tabState}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleTabClick(true)}
          >
            <MessageCircleMore />
            <span>Comments</span>
          </li>
        </ul>
      </nav>

      <div className={styles.headerBox}>
        <CommentCount count={null} />
        <Sort />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.tabContent}>
          {!tabState ? (
            <div className={styles.contentBox}>
              {talks.length === 0 ? (
                <p className={styles.emptyBox}>
                  <NotFound {...iconStyles} />
                  No talks to show :(
                </p>
              ) : (
                <>
                  {ITEMS_PER_PAGE >= 10 && (
                    <Pagination
                      currentPage={talkPage}
                      totalPages={talkTotalPages}
                      onPageChange={setTalkPage}
                    />
                  )}

                  {paginatedTalks.map((talk) => (
                    <Talk
                      key={talk.title}
                      title={talk.title}
                      snippet={talk.snippet}
                      date={talk.date}
                      username={talk.username}
                      upvote={talk.upvote}
                      downvote={talk.downvote}
                      content={talk.content}
                    />
                  ))}

                  <Pagination
                    currentPage={talkPage}
                    totalPages={talkTotalPages}
                    onPageChange={setTalkPage}
                  />
                </>
              )}
            </div>
          ) : (
            <div className={styles.contentBox}>
              {comments.length === 0 ? (
                <p className={styles.emptyBox}>
                  <NotFound {...iconStyles} />
                  No comments to show :/
                </p>
              ) : (
                <>
                  {/* Pagination Upper*/}
                  {ITEMS_PER_PAGE >= 10 && (
                    <Pagination
                      currentPage={commentPage}
                      totalPages={commentTotalPages}
                      onPageChange={setCommentPage}
                      containerClassName={styles.paginationWrapper}
                    />
                  )}

                  {paginatedComments.map((comment, index: number) => (
                    <Comment
                      _id={comment._id}
                      key={index}
                      text={comment.text}
                      date={new Date(comment.date)}
                      username={comment.username}
                      avatar_url={comment.avatar_url}
                      upvote={comment.upvote}
                      downvote={comment.downvote}
                    />
                  ))}
                  {/* Pagination Bottom */}
                  <Pagination
                    currentPage={commentPage}
                    totalPages={commentTotalPages}
                    onPageChange={setCommentPage}
                    containerClassName={styles.paginationWrapper}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;
