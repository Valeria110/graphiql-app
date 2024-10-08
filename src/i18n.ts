import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'ru'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) {
    notFound();
  }

  const defaultLocalization = (await import(`../localization/en.json`)).default;
  let localeLocalization = {};

  if (locale !== 'en') {
    try {
      localeLocalization = (await import(`../localization/${locale}.json`)).default;
    } catch (error) {
      console.warn(`Could not load messages for locale: ${locale}`, error);
    }
  }

  // Mix localization if we don't have all keys
  const messages = {
    ...defaultLocalization,
    ...localeLocalization,
  };

  return {
    messages,
  };
});
