import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/ui/navbar/Navbar';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/redux/slices/user/userSlice';

/*
RUN THE TEST DIRECTLY
yarn jest --testPathPattern=navbarDropdown.spec.ts
*/
const loggedInState = {
  user: {
    user: {
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
      talks: [],
      security_pin: null,
    },
    isLoggedIn: true,
  },
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: loggedInState,
});

describe('Navbar user menu toggle', () => {
  test('opens and closes user dropdown menu when clicking avatar', () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );

    const avatarButton = screen.getByTestId('avatar-button');
    expect(avatarButton).toBeInTheDocument();

    expect(screen.queryByTestId('menu-feed')).not.toBeInTheDocument();

    fireEvent.click(avatarButton);
    expect(screen.getByTestId('menu-feed')).toBeInTheDocument();
    expect(screen.getByTestId('menu-profile')).toBeInTheDocument();
    expect(screen.getByTestId('menu-settings')).toBeInTheDocument();
    expect(screen.getByTestId('menu-logout')).toBeInTheDocument();

    fireEvent.click(avatarButton);
    expect(screen.queryByTestId('menu-feed')).not.toBeInTheDocument();
  });
});
