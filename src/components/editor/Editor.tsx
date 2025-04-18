'use client';
import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import Italic from '@tiptap/extension-italic';
import { useEditor, EditorContent } from '@tiptap/react';
import MenuBar from './components/MenuBar';
import styles from './styles/Editor.module.css';
import clsx from 'clsx';
import React from 'react';
import Highlight from '@tiptap/extension-highlight';
import Heading from '@tiptap/extension-heading';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';
import CharCount from './components/CharCount';

interface IEditorProps {
  content: string;
  onChange: (content: string) => void;
  style?: React.CSSProperties;
  className?: string;
}
// TODO: LINK IMAGE. YOUTUBE VIDEO ETC
const CHAR_LIMIT = 10;
const Editor = ({ content, onChange, style, className }: IEditorProps) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }),
      Highlight.configure({ multicolor: true }),
      Italic,
      Underline,
      CharacterCount.configure({
        limit: CHAR_LIMIT,
      }),
    ],
    content: content || 'Excited to hear what you say!',
    editorProps: {
      attributes: {
        class: styles.content,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className={clsx(styles.container, className)} style={style}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {editor && <CharCount editor={editor} limit={CHAR_LIMIT} />}
    </div>
  );
};

export default React.memo(Editor);
