import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/types/user';

// Slice tipi
interface UserState {
  user: IUser | null;
  isLoggedIn: boolean;
}

// MOCK USER (geliştirme amaçlı)
const mockUser: IUser = {
  _id: '123',
  username: 'demo_user',
  password: 'test123',
  display_name: 'Demo Kullanıcı',
  email: 'demo@anitalk.com',
  avatar_url: 'https://picsum.photos/64/64',
  birth_date: new Date('1995-08-24'),
  cover_img_url: 'https://picsum.photos/1920/1080',
  reddit_url: 'https://reddit.com/u/demouser',
  x_url: 'https://x.com/demouser',
  mal_url: 'https://myanimelist.net/profile/demouser',
  favorite_animes: [],
  blocked_users: [],
  followers: [],
  followings: [],
  entries: [],
  security_pin: null,
};

const initialState: UserState = {
  user: mockUser,
  isLoggedIn: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
