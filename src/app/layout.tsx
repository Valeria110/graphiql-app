'use client';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { Poppins } from 'next/font/google';
import '../styles/globalStyles.scss';
import { CustomThemeProvider } from '@/components/CustomThemeProvider/CustomThemeProvider';
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
        <CustomThemeProvider>
          <ErrorBoundary>{children}<ClientRedirect /></ErrorBoundary>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
