'use client';
import React from 'react';
import styles from './styles.module.css';
import { H2 } from '../headings';
import { MessageCircleHeart } from 'lucide-react';

interface ICommentCount {
  count: number | null;
}

const CommentCount: React.FC<ICommentCount> = ({ count }) => {
  const hasComments = typeof count === 'number' && count > 0;

  return (
    <H2>
      <div className={styles.commentBox}>
        <MessageCircleHeart />
        {hasComments ? (
          <>
            <span>{count}</span> {count === 1 ? 'Comment' : 'Comments'}
          </>
        ) : (
          <>
            No comments yet! <span> Start the conversation!</span>
          </>
        )}
      </div>
    </H2>
  );
};

export default React.memo(CommentCount);
