'use client'
import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import styles from "./styles/Editor.module.css";

interface IEditorProps {
    content:string;
    onChange: (content: string) => void;
}

const Editor = (props:IEditorProps) => {
    const {content,onChange} = props;

  const editor = useEditor({
   extensions: [StarterKit.configure()],
    content: content ? content : 'Let the share your ideas.',
    editorProps: {
        attributes:{
            class:`${styles.container}`
        }
    }
    
  })

  return <EditorContent editor={editor} />
}

export default Editor;