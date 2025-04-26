import React from 'react';

interface IconStyles {
  width: string | number;
  height: string | number;
  opacity: number;
  color: string;
}

interface IBlog {
  _id: string;
  title: string;
  snippet: string;
  date: Date;
  img_url: string;
  author: string;
  slug: string;
}

interface ITalk {
  title: string;
  snippet: string;
  date: Date;
  username: string;
  upvote: number;
  downvote: number;
  content: string | null;
}

interface IComment {
  _id: string;
  text: string;
  date: Date;
  username: string;
  avatar_url: string | null;
  upvote: number;
  downvote: number;
}

interface IBadge {
  title: string;
  color: string;
  icon?: React.JSX.Element;
}

interface CustomEditor extends TiptapEditor {
  commands: TiptapEditor['commands'] & {
    myCustomCommand: () => void;
  };

  user_id: string;
  isEditable: boolean;
}

export { IconStyles, IBlog, ITalk, IComment, IBadge, CustomEditor };
