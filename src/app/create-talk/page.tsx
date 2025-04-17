'use client';
import { useState } from 'react';
import Editor from '@/components/editor/Editor';
import React from 'react';

export default function EditorPage() {
  const [editorContent, setEditorContent] = useState<string>('<p>Initial Content</p>');
  const handleEditorChange = (html: string) => {
    setEditorContent(html);
    return;
  };

  return (
    <React.Fragment>
      <section>
        <Editor content={editorContent} onChange={handleEditorChange} />
      </section>
    </React.Fragment>
  );
}
