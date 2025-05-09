import config from '@/config/index';

const ENDPOINTS: Readonly<Record<string, string>> = {
  postSignup: `${config.BASE_URL}/${config.API_PREFIX}/auth/signup`,
  postSignin: `${config.BASE_URL}/${config.API_PREFIX}/auth/signin`,
  postforgotPasswordMail: `${config.BASE_URL}/${config.API_PREFIX}/auth/forgot-password-mail`,
  postForgotPasswordCode: `${config.BASE_URL}/${config.API_PREFIX}/auth/forgot-password-code`,
} as const;

Object.freeze(ENDPOINTS);

export default ENDPOINTS;
