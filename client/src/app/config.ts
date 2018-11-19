const __DEV__ = process.env.NODE_ENV !== 'production';

const BASE_URL = process.env.NODE_ENV === 'production' ?
  // 'http://srv-cha-devupcitiz/api' :
  '/backend' :
  // 'https://paysdelaloire.up-maregion.fr/backend'
  // 'https://devupcitiz.solutions-implicit.fr/backend'
  // 'https://recupcitiz.solutions-implicit.fr/backend'
  // 'https://qa-paysdelaloire.up-maregion.fr/backend'
  'http://localhost:58307'
;

const DEFAULT_ERROR = 'Une erreur est survenue';

export {
  __DEV__,
  BASE_URL,
  DEFAULT_ERROR,
};
