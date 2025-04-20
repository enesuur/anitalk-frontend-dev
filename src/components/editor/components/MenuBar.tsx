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
  Link as LinkIcon,
  Unlink2,
  SquarePlay,
  ImagePlus,
  ImageUp,
  MessageSquareQuote,
  Minus,
  Undo,
  Redo,
  AtSign,
} from 'lucide-react';
import { Editor } from '@tiptap/react';
import { Toggle } from '../components/Toggle';
import { iconStyles } from '@/helpers';
import styles from '../styles/MenuBar.module.css';

interface IMenuBarProps {
  editor: Editor | null;
  setLink: () => void;
  addVideo: () => void;
  addImage: () => void;
}

interface IOption {
  name: string;
  icon: React.JSX.Element;
  onClick: () => void;
  pressed: boolean;
  disabled?: boolean;
}

const MenuBar = ({ editor, setLink, addVideo, addImage }: IMenuBarProps) => {
  if (!editor) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const options: IOption[] = useMemo(
    () => [
      {
        name: 'Heading 1',
        icon: <Heading1 {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        pressed: editor.isActive('heading', { level: 1 }),
        disabled: !editor.can().toggleHeading({ level: 1 }),
      },
      {
        name: 'Heading 2',
        icon: <Heading2 {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        pressed: editor.isActive('heading', { level: 2 }),
        disabled: !editor.can().toggleHeading({ level: 2 }),
      },
      {
        name: 'Heading 3',
        icon: <Heading3 {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        pressed: editor.isActive('heading', { level: 3 }),
        disabled: !editor.can().toggleHeading({ level: 3 }),
      },
      {
        name: 'Heading 4',
        icon: <Heading4 {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
        pressed: editor.isActive('heading', { level: 4 }),
        disabled: !editor.can().toggleHeading({ level: 4 }),
      },
      {
        name: 'Heading 5',
        icon: <Heading5 {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
        pressed: editor.isActive('heading', { level: 5 }),
        disabled: !editor.can().toggleHeading({ level: 5 }),
      },
      {
        name: 'Bold',
        icon: <Bold {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleBold().run(),
        pressed: editor.isActive('bold'),
        disabled: !editor.can().toggleBold(),
      },
      {
        name: 'Italic',
        icon: <Italic {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        pressed: editor.isActive('italic'),
        disabled: !editor.can().toggleItalic(),
      },
      {
        name: 'Strikethrough',
        icon: <Strikethrough {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleStrike().run(),
        pressed: editor.isActive('strike'),
        disabled: !editor.can().toggleStrike(),
      },
      {
        name: 'Align Left',
        icon: <AlignLeft {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().setTextAlign('left').run(),
        pressed: editor.isActive({ textAlign: 'left' }),
        disabled: !editor.can().setTextAlign('left'),
      },
      {
        name: 'Align Center',
        icon: <AlignCenter {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().setTextAlign('center').run(),
        pressed: editor.isActive({ textAlign: 'center' }),
        disabled: !editor.can().setTextAlign('center'),
      },
      {
        name: 'Align Right',
        icon: <AlignRight {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().setTextAlign('right').run(),
        pressed: editor.isActive({ textAlign: 'right' }),
        disabled: !editor.can().setTextAlign('right'),
      },
      {
        name: 'Bullet List',
        icon: <List {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        pressed: editor.isActive('bulletList'),
        disabled: !editor.can().toggleBulletList(),
      },
      {
        name: 'Ordered List',
        icon: <ListOrdered {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        pressed: editor.isActive('orderedList'),
        disabled: !editor.can().toggleOrderedList(),
      },
      {
        name: 'Highlight',
        icon: <Highlighter {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleHighlight().run(),
        pressed: editor.isActive('highlight'),
        disabled: !editor.can().toggleHighlight?.(), // bazı custom extensions optional olabilir
      },
      {
        name: 'Underline',
        icon: <Underline {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleUnderline().run(),
        pressed: editor.isActive('underline'),
        disabled: !editor.can().toggleUnderline?.(),
      },
      {
        name: 'Add Link',
        icon: <LinkIcon {...iconStyles} opacity={1} />,
        onClick: () => setLink(),
        pressed: editor.isActive('link'),
        disabled: false, // link ekle hep aktif
      },
      {
        name: 'Remove Link',
        icon: <Unlink2 {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().unsetLink().run(),
        pressed: editor.isActive('link'),
        disabled: !editor.can().unsetLink?.(),
      },
      {
        name: 'Add Video',
        icon: <SquarePlay {...iconStyles} opacity={1} />,
        onClick: () => addVideo(),
        pressed: false,
        disabled: false,
      },
      {
        name: 'Insert Image',
        icon: <ImagePlus {...iconStyles} opacity={1} />,
        onClick: () => addImage(),
        pressed: false,
        disabled: false,
      },
      {
        name: 'Upload Image',
        icon: <ImageUp {...iconStyles} opacity={1} />,
        onClick: () => addImage(),
        pressed: false,
        disabled: false,
      },
      {
        name: 'Blockquote',
        icon: <MessageSquareQuote {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().toggleBlockquote().run(),
        pressed: editor.isActive('blockquote'),
        disabled: !editor.can().toggleBlockquote?.(),
      },
      {
        name: 'Text Color',
        icon: (
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '1px solid #ccc',
            }}
          >
            <input
              type='color'
              onInput={(event) =>
                editor
                  .chain()
                  .focus()
                  .setColor((event.target as HTMLInputElement).value)
                  .run()
              }
              value={editor.getAttributes('textStyle').color || '#000000'}
              data-testid='setColor'
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
            />
          </div>
        ),
        onClick: () => {}, // Color input handles its own change
        pressed: false,
        disabled: !editor.can().setColor?.('#000000'),
      },
      {
        name: 'Horizontal Rule',
        icon: <Minus {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().setHorizontalRule().run(),
        pressed: false,
        disabled: !editor.can().setHorizontalRule?.(),
      },
      {
        name: 'Undo',
        icon: <Undo {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().undo().run(),
        pressed: false,
        disabled: !editor.can().undo(),
      },
      {
        name: 'Redo',
        icon: <Redo {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().redo().run(),
        pressed: false,
        disabled: !editor.can().redo(),
      },
      {
        name: 'Mention',
        icon: <AtSign {...iconStyles} opacity={1} />,
        onClick: () => editor.chain().focus().redo().run(),
        pressed: false,
        disabled: !editor.can().redo(),
      },
    ],
    [editor, setLink, addImage, addVideo],
  );

  return (
    <div className={styles.container}>
      {options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.pressed}
          onClick={option.onClick}
          name={option.name}
          disabled={option.disabled}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
};

export default MenuBar;
