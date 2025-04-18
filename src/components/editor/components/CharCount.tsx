'use client';
import { CircleAlert, icons } from 'lucide-react';
import React from 'react';
import styles from '../styles/CharCount.module.css';
import type { Editor } from '@tiptap/react';
import { iconStyles } from '@/helpers';

interface ICharacterCountProps {
  editor: Editor;
  limit: number;
}

const CharacterCount = (props: ICharacterCountProps) => {
  const { editor, limit } = props;
  const characterCount = editor.storage.characterCount.characters();
  const wordCount = editor.storage.characterCount.words();

  return (
    <div className={`${styles.container} `}>
      <div className={styles.characterCountInfo}>
        <CircleAlert {...iconStyles} width={16} height={16} />
        <span
          className={`${styles.characterCountText} ${
            characterCount >= limit ? styles.warning : ''
          }`}
        >
          {characterCount} / {limit} characters
        </span>
      </div>

      <div className={styles.wordCount}>{wordCount} words</div>
    </div>
  );
};

export default CharacterCount;
