import i18n from 'i18next'
import * as RNLocalize from 'react-native-localize'
import { resource } from './config'

const languageDetector = {
  type: 'languageDetector' as 'languageDetector' | 'backend' | 'logger' | 'postProcessor' | 'i18nFormat' | '3rdParty',
  async: true, // flags below detection to be async
  detect: (callback: any) => {
    const fallback = { languageTag: 'zh' }

    const { languageTag } = RNLocalize.findBestAvailableLanguage(['en', 'zh']) || fallback

    callback(languageTag)
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .init({
    fallbackLng: 'zh',

    resources: resource,

    debug: false,

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    // initImmediate: false,
    // lng: 'zh',

    // cache: {
    //   enabled: true
    // },
    returnObjects: true,
    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  });

export default i18n;
