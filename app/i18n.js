/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */

const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
const enLocaleData = require('react-intl/locale-data/en');
const zhLocaleData = require('react-intl/locale-data/zh');
const jaLocaleData = require('react-intl/locale-data/ja');

const enTranslationMessages = require('./translations/en.json');
const zhTranslationMessages = require('./translations/zh.json');
const jaTranslationMessages = require('./translations/ja.json');
const settings = require('./settings.js');

addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);
addLocaleData(jaLocaleData);

//Disable i18n error message.
// eslint-disable-next-line
const consoleError = console.error.bind(console);
// eslint-disable-next-line
// console.error = (message, ...args) => {
//   if (
//     typeof message === 'string' &&
//     message.startsWith('[React Intl] Missing message:')
//   ) {
//     return;
//   }
//   consoleError(message, ...args);
// };

const DEFAULT_LOCALE = settings.language;

// prettier-ignore
const appLocales = [
  'en',
  'zh',
  'ja',
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  zh: formatTranslationMessages('zh', zhTranslationMessages),
  ja: formatTranslationMessages('ja', jaTranslationMessages),
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
