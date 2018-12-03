const __DEV__ = process.env.NODE_ENV !== 'production';

const APP_ID = '0796df8e-8c2e-446a-bdaf-9083ed6ca17b';

const AUTH_URL = `https://login.microsoftonline.com/7fc1e7d6-af46-46b4-ada2-d40be0d94b9f/oauth2/authorize?client_id=${APP_ID}&response_type=code&URI_CODE&response_mode=query&state=STATE_CODE`;

const BASE_URL = process.env.NODE_ENV === 'production' ?
  '/backend' :
  'http://localhost:3000';

const DEFAULT_ERROR = 'Une erreur est survenue';

export {
  __DEV__,
  BASE_URL,
  AUTH_URL,
  DEFAULT_ERROR,
};
