'use client';
import { useState } from 'react';
import Editor from '@/components/editor/Editor';
import React from 'react';

export default function CreateTalk() {
  const [editorContent, setEditorContent] = useState<string | null>(null);
  const handleEditorChange = (html: string) => {
    setEditorContent(html);
    return;
  };

  return (
    <React.Fragment>
      <section>
        <div className='container'>
          <Editor content={editorContent} onChange={handleEditorChange} />
        </div>
      </section>
    </React.Fragment>
  );
}
