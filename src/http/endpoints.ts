import config from '@/config/index';

const ENDPOINTS: Readonly<Record<string, string>> = {
  postSignup: `${config.BASE_URL}/${config.API_PREFIX}/auth/signup`,
  postSignin: `${config.BASE_URL}/${config.API_PREFIX}/auth/signin`,
  postforgotPasswordMail: `${config.BASE_URL}/${config.API_PREFIX}/auth/forgot-password-mail`,
  postForgotPasswordCode: `${config.BASE_URL}/${config.API_PREFIX}/auth/forgot-password-code`,
  postUsername: `${config.BASE_URL}/${config.API_PREFIX}/user/username`,
  postUserCountry: `${config.BASE_URL}/${config.API_PREFIX}/user/country`,
  postUserBiography: `${config.BASE_URL}/${config.API_PREFIX}/user/biography`,
  postUserAvatar: `${config.BASE_URL}/${config.API_PREFIX}/user/avatar`,
  DeleteUserAvatar: `${config.BASE_URL}/${config.API_PREFIX}/user/avatar`,
  postUserCoverImage: `${config.BASE_URL}/${config.API_PREFIX}/user/cover-image`,
  deleteUserCoverImage: `${config.BASE_URL}/${config.API_PREFIX}/user/cover-image`,
  postUserFavorite: `${config.BASE_URL}/${config.API_PREFIX}/user/favorite`,
  getNetworkCheck: 'https://www.google.com/generate_204',
} as const;

Object.freeze(ENDPOINTS);

export default ENDPOINTS;
