import React from 'react';
import SigninForm from '../forms/Signin';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anitalk - Sign up',
  description:
    'Sign in your Anitalk account and join the global anime and manga community. Discover trending content, share opinions, and connect with fellow otakus.',
  keywords: [
    'anime sign in',
    'anitalk login',
    'join anime community',
    'manga platform registration',
    'otaku social network',
    'anime fans forum',
    'cosplay fanbase',
    'donghua community',
    'anime social media',
    'sign in to anitalk',
  ],
  openGraph: {
    title: 'Anitalk - Sign up',
    description:
      'Register now to access Anitalk, the hub for anime, manga, cosplay, and Asian pop culture fans worldwide.',
    url: 'https://www.anitalk.com/auth/sign-up',
    siteName: 'Anitalk',
    images: [
      {
        url: 'https://www.anitalk.com/images/og-signup.jpg',
        width: 1200,
        height: 630,
        alt: 'Anitalk Sign Up Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anitalk - Sign up',
    description:
      'Become a part of Anitalk and meet anime lovers around the world. Sign up to join discussions, events, and top content.',
    images: ['https://www.anitalk.com/images/og-signup.jpg'],
  },
};

export const revalidate = 86400;
const Page = async () => {
  return (
    <section>
      <SigninForm />
    </section>
  );
};

export default Page;
