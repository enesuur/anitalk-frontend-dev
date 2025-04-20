'use client';
import { BubbleMenu as Menu, Editor } from '@tiptap/react';
import styles from '../styles/BubbleMenu.module.css';
import React from 'react';

interface BubbleMenuProps {
  editor: Editor;
}

const BubbleMenu = ({ editor }: BubbleMenuProps) => {
  if (!editor) return null;

  return (
    <React.Fragment>
      {editor ? (
        <Menu className={styles.bubbleMenu} tippyOptions={{ duration: 100 }} editor={editor}>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? styles.isActive : ''}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? styles.isActive : ''}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? styles.isActive : ''}
          >
            Strike
          </button>
        </Menu>
      ) : (
        <span>Bubble exploited</span>
      )}
    </React.Fragment>
  );
};

export default BubbleMenu;
