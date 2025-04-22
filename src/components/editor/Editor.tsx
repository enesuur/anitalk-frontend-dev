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
import React, { useCallback, useState } from 'react';
import Highlight from '@tiptap/extension-highlight';
import Heading from '@tiptap/extension-heading';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';
import CharCount from './components/CharCount';
import Typography from '@tiptap/extension-typography';
import TextStyle from '@tiptap/extension-text-style';
import Strike from '@tiptap/extension-strike';
import Link from '@tiptap/extension-link';
import UrlModal from '@/components/modals/url/UrlModal';
import Youtube from '@tiptap/extension-youtube';
import VideoModal from '../modals/video/VideoModal';
import Image from '@tiptap/extension-image';
import AddImage from '../modals/image/AddImage';
import Dropcursor from '@tiptap/extension-dropcursor';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Placeholder from '@tiptap/extension-placeholder';
import History from '@tiptap/extension-history';
import { Color } from '@tiptap/extension-color';
import Mention from '@tiptap/extension-mention';
import BubbleMenu from './components/BubbleMenu';
import { ImageUploadNode } from '@/components/tiptap-node/image-upload-node';
import { handleImageUpload, MAX_FILE_SIZE, IMAGE_FILE_LIMIT } from './helpers';

interface IEditorProps {
  content: string | null;
  onChange: (content: string) => void;
  style?: React.CSSProperties;
  className?: string;
  shouldOptimizeRendering: boolean;
}

const CHAR_LIMIT = 20000;

// TODO: Youtube default language will be change after localization.

const Editor = ({ content, onChange, style, className, shouldOptimizeRendering }: IEditorProps) => {
  const [isUrlModalOpen, setIsUrlModalOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [videoState, setVideoState] = useState({
    url: '' as string,
    width: 640 as number,
    height: 480 as number,
  });
  const [imageState, setImageState] = useState({
    url: '' as string,
    alt: '' as string | undefined,
    title: '' as string | undefined,
  });

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Typography,
      Strike,
      TextStyle.configure({ mergeNestedSpanStyles: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Heading.configure({ levels: [1, 2, 3, 4, 5] }),
      Highlight.configure({ multicolor: true }),
      Italic,
      Underline,
      Dropcursor,
      CharacterCount.configure({ limit: CHAR_LIMIT }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'image',
        },
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'http',
        protocols: ['http', 'https'],
        HTMLAttributes: {
          class: 'link',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Youtube.configure({
        inline: false,
        controls: true,
        nocookie: false,
        allowFullscreen: true,
        ccLanguage: 'tr',
        interfaceLanguage: 'en',
        width: 640,
        height: 480,
        origin: 'localhost:3000',
        modestBranding: true,
        progressBarColor: 'orange',
      }),
      Blockquote,
      BulletList,
      ListItem,
      OrderedList,
      HorizontalRule.configure({
        HTMLAttributes: {
          class: 'horizontal',
        },
      }),
      Placeholder.configure({
        placeholder: 'Turn your ideas into awesome blog. ',
      }),
      History,
      Color,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
      }),
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: IMAGE_FILE_LIMIT,
        upload: handleImageUpload,
        onError: (error) => console.error('Upload failed:', error),
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: styles.content,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
    shouldRerenderOnTransaction: !shouldOptimizeRendering,
  });

  const openLinkModal = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href || '';
    setVideoState((prev) => ({ ...prev, url: previousUrl }));
    setIsUrlModalOpen(true);
  }, [editor]);

  const handleSubmitUrl = useCallback(
    (url: string) => {
      if (!editor) return;

      if (!url.trim()) {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
      } else {
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      }
      setIsUrlModalOpen(false);
    },
    [editor],
  );

  const handleAddVideo = useCallback(
    (url: string, width: number, height: number) => {
      if (!editor || !url) return;

      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, width),
        height: Math.max(180, height),
      });
      setIsVideoModalOpen(false);
    },
    [editor],
  );

  const openVideoModal = useCallback(() => {
    setIsVideoModalOpen(true);
  }, []);

  const addImage = useCallback(() => {
    setIsImageModalOpen(true);
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className={clsx(styles.container, className)} style={style}>
        <BubbleMenu editor={editor} />
        <MenuBar
          editor={editor}
          setLink={openLinkModal}
          addVideo={openVideoModal}
          addImage={addImage}
        />
        <EditorContent editor={editor} />
        {editor && <CharCount editor={editor} limit={CHAR_LIMIT} />}
      </div>

      <UrlModal
        isOpen={isUrlModalOpen}
        onClose={() => setIsUrlModalOpen(false)}
        onSubmit={handleSubmitUrl}
        handleUrlChange={(url) => setVideoState((prev) => ({ ...prev, url }))}
        url={videoState.url}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onSubmit={handleAddVideo}
        url={videoState.url}
        handleUrlChange={(url) => setVideoState((prev) => ({ ...prev, url }))}
        width={videoState.width}
        height={videoState.height}
        handleWidthChange={(width) => setVideoState((prev) => ({ ...prev, width }))}
        handleHeightChange={(height) => setVideoState((prev) => ({ ...prev, height }))}
      />
      <AddImage
        isOpen={isImageModalOpen}
        onClose={() => {
          console.log('Closing image modal');
          setIsImageModalOpen(false);
        }}
        onSubmit={(img) => {
          console.log('Image submitted:', img);
          if (!editor) return;
          editor.commands.setImage({
            src: img?.url,
            alt: img?.alt,
            title: img?.title,
          });
        }}
        imageState={imageState}
        setImageState={setImageState}
      />
    </>
  );
};

export default React.memo(Editor);
