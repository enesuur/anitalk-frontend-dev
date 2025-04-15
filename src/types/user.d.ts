export interface IFavorite_Anime {
  _id: string;
  english_name: string | null;
  japanese_name: string | null;
  release_date: Date | null;
  airing_date: Date | null;
  ending_date: Date | null;
  mal_url: string | null;
  cover_img_url: string | null;
}

export interface IEntry {
  _id: string;
  title: string;
  snippet: string | null;
  body: string;
  date: Date;
  entry_url: string | null;
  entry_owner: PartialUser;
}
// TODO: Security issues, staging codes.
export interface IUser {
  _id: string;
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
  blocked_users: string[];
  followers: PartialUser[];
  followings: PartialUser[];
  entries: IEntry[];
  security_pin: number | null;
}

export type PartialUser = Pick<IUser, '_id' | 'username' | 'avatar_url'> & {
  display_name: string | null;
};
