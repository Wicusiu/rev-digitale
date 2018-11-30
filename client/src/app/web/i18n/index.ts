import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

import fr from './fr';

if (!String.format) {
  String.format = function (val: string, ...args: string[]) {
    return val.replace(/{(\d+)}/g, (match, num) => {
      return typeof args[num] !== 'undefined'
        ? args[num]
        : match
        ;
    });
  };
}

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    interpolation: {
      // React already does escaping
      escapeValue: false,
    },
    lng: 'fr', // 'en' | 'es'
    // Using simple hardcoded resources for simple example
    resources: {
      fr: {
        translation: fr,
      },
    },
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
    },
  });

export default i18n;
