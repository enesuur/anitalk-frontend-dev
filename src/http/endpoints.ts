import config from '@/config/index';

const BASE_URL = `${config.REMOTE_HOST}:${config.REMOTE_PORT}/api/${config.API_PREFIX}`;

const ENDPOINTS: Readonly<Record<string, string>> = {
  postSignup: `${BASE_URL}/sign-up`,
  postSignin: `${BASE_URL}/sign-in`,
  postforgotPasswordMail: `${BASE_URL}/auth/forgot-password-mail`,
  postForgotPasswordCode: `${BASE_URL}/forgot-password-code`,
  postUsername: `${BASE_URL}/user/username`,
  postUserCountry: `${BASE_URL}/user/country`,
  postUserBiography: `${BASE_URL}/user/biography`,
  postUserAvatar: `${BASE_URL}/user/avatar`,
  DeleteUserAvatar: `${BASE_URL}/user/avatar`,
  postUserCoverImage: `${BASE_URL}/user/cover-image`,
  deleteUserCoverImage: `${BASE_URL}/user/cover-image`,
  postUserFavorite: `${BASE_URL}/user/favorite`,
  postContactForm: `${BASE_URL}/forms/report`,
  getNetworkCheck: 'https://www.google.com/generate_204',
} as const;

Object.freeze(ENDPOINTS);

export default ENDPOINTS;
