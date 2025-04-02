export interface IFavorite_Anime {
  _id: string;
  english_name?: string;
  japanese_name?: string;
  release_date?: Date;
  airing_date?: Date;
  ending_date?: Date;
  mal_url?: string;
  cover_img_url?: string;
}

export interface IEntry {
  _id: string;
  title: string;
  snippet?: string;
  body: string;
  date: Date;
  entry_url?: string;
  entry_owner: PartialUser;
}

export interface IUser {
  _id: string;
  username: string;
  display_name:string;
  avatar_url?: string;
  birth_date?: Date;
  cover_img_url?: string;
  reddit_url?: string;
  x_url?: string;
  mal_url?: string;
  favorite_animes?: IFavorite_Anime[];
  blocked_users: string[];
  followers: PartialUser[];
  followings: PartialUser[];
  entries: IEntry[];
}

export type PartialUser = Pick<IUser, '_id' | 'username' | 'avatar_url'> & {
  display_name?: string;
};
