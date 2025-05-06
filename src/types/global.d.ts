import React from 'react';

interface IconStyles {
  width: string | number;
  height: string | number;
  opacity: number;
  color: string;
}

interface IBlogLabel {
  title: string;
  color: string;
}

interface IBlog {
  _id: string;
  title: string;
  snippet: string;
  date: Date;
  img_url?: string;
  author: string;
  slug: string;
  read_time?: number;
  label?: IBlogLabel;
  comments: IComment[];
}

interface IMiniTalk {
  _id: string;
  title: string;
  slug: string;
  comment_count: number;
}

interface ITalk {
  _id: string;
  title: string;
  snippet: string;
  date: Date;
  username: string;
  upvote: number;
  downvote: number;
  content: string | null;
  callback?: (args: TArgs) => TReturn;
}

interface IComment<TArgs = void, TReturn = void> {
  _id: string;
  text: string;
  date: Date;
  username: string;
  avatar_url: string | null;
  upvote: number;
  downvote: number;
  callback?: (args: TArgs) => TReturn;
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

type Category = {
  id: number;
  path: string;
  label: string;
  color: string;
};

type Season = {
  label: string;
  value: string;
};

type SwiperOptions = {
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  transitionDuration?: number;
  slidesPerView?: number;
  spacing?: number;
  showDots?: boolean;
  showArrows?: boolean;
  pauseOnHover?: boolean;
  responsive?: {
    [breakpoint: number]: {
      slidesPerView?: number;
      spacing?: number;
    };
  };
};

export {
  IconStyles,
  IBlog,
  ITalk,
  IComment,
  IBadge,
  CustomEditor,
  Category,
  Season,
  SwiperOptions,
  IBlogLabel,
  IBlog,
  IMiniTalk,
};
