import Footer from '@/components/Footer/Footer';
// import Header from '@/components/Header/Header';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({ children }: { children: React.ReactNode; params: { locale: string } }) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {/* <Header /> */}
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
