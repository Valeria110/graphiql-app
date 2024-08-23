'use client';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Header from '@/components/Header/Header';
import { Poppins } from 'next/font/google';
import '../styles/globalStyles.scss';
import Footer from '@/components/Footer/Footer';
import ClientRedirect from '@/components/ClientRedirect/ClientRedirect';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <title>Graphiql App</title>
      </head>
      <body className={poppins.className}>
        <Header />
        <ErrorBoundary>
          {children}
          <ClientRedirect />
        </ErrorBoundary>
        <Footer />
      </body>
    </html>
  );
}
