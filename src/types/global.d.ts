import React from 'react';

/* 
All shared global types across the application.
*/
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
  key?: string;
  title: string;
  snippet: string;
  date: Date;
  img_url?: string;
  author: string;
  slug: string;
  read_time: number;
  label: IBlogLabel;
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

interface IUser {
  _id: string | null;
  username: string;
  email: string;
  password: string;
  display_name: string | null;
  avatar_url: string;
  birth_date: Date | null;
  cover_img_url: string | null;
  reddit_url: string | null;
  x_url: string | null;
  mal_url: string | null;
  favorite_animes: IFavorite_Anime[] | null;
  blocked_users: Partial<IUser>[] | null;
  followers: Partial<IUser>[] | null;
  followings: Partial<IUser>[] | null;
  talks: ITalk[] | null;
  security_pin: number | null;
  isMailVerified: boolean;
}

interface ISonnerToast {
  isOpen: boolean;
  message: string;
  title: string;
  type?: 'success' | 'alert' | 'danger' | 'warn' | 'default';
}

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
  ISonnerToast,
  IUser,
};
