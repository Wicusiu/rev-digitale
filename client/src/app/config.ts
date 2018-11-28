const __DEV__ = process.env.NODE_ENV !== 'production';

const BASE_URL = process.env.NODE_ENV === 'production' ?
  '/backend' :
  'http://localhost:3000';

const DEFAULT_ERROR = 'Une erreur est survenue';

export {
  __DEV__,
  BASE_URL,
  DEFAULT_ERROR,
};
