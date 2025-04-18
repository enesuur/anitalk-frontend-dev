'use client';
import React, { useMemo } from 'react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
} from 'lucide-react';
import { Editor } from '@tiptap/react';
import { Toggle } from '../components/Toggle';
import { iconStyles } from '@/helpers';
import styles from '../styles/MenuBar.module.css';

interface IMenuBarProps {
  editor: Editor | null;
}

const MenuBar = ({ editor }: IMenuBarProps) => {
  if (!editor) return null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const options = useMemo(
    () => [
      {
        icon: <Heading1 {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        preesed: editor.isActive('heading', { level: 1 }),
      },
      {
        icon: <Heading2 {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        preesed: editor.isActive('heading', { level: 2 }),
      },

      {
        icon: <Heading3 {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        preesed: editor.isActive('heading', { level: 3 }),
      },

      {
        icon: <Heading4 {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        preesed: editor.isActive('heading', { level: 4 }),
      },
      {
        icon: <Heading5 {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        preesed: editor.isActive('heading', { level: 5 }),
      },
      {
        icon: <Bold {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleBold().run(),
        preesed: editor.isActive('bold'),
      },
      {
        icon: <Italic {...iconStyles} opacity={1} />,
        onClick: () => {
          console.log('italic clicked');
          editor.chain().focus().toggleItalic().run();
        },
        preesed: editor.isActive('italic'),
      },
      {
        icon: <Strikethrough {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleStrike().run(),
        preesed: editor.isActive('strike'),
      },
      {
        icon: <AlignLeft {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().setTextAlign('left').run(),
        preesed: editor.isActive({ textAlign: 'left' }),
      },
      {
        icon: <AlignCenter {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().setTextAlign('center').run(),
        preesed: editor.isActive({ textAlign: 'center' }),
      },
      {
        icon: <AlignRight {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().setTextAlign('right').run(),
        preesed: editor.isActive({ textAlign: 'right' }),
      },
      {
        icon: <List {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        preesed: editor.isActive('bulletList'),
      },
      {
        icon: <ListOrdered {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        preesed: editor.isActive('orderedList'),
      },
      {
        icon: <Highlighter {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleHighlight().run(),
        preesed: editor.isActive('highlight'),
      },
      {
        icon: <Underline {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleUnderline().run(),
        preesed: editor.isActive('underline'),
      },
    ],
    [editor],
  );

  return (
    <div className={styles.container}>
      {options.map((option, index) => (
        <Toggle key={index} pressed={option.preesed} onClick={option.onClick}>
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
};

export default MenuBar;
