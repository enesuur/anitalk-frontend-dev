import config from '@/config/index';

const ENDPOINTS: Readonly<Record<string, string>> = {
  signUp: `${config.BASE_URL}/${config.API_PREFIX}/auth/signup`,
  signIn: `${config.BASE_URL}/${config.API_PREFIX}/auth/signin`,
};

export default ENDPOINTS;
