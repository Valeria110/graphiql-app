'use client';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { Poppins } from 'next/font/google';
import '../styles/globalStyles.scss';
import { CustomThemeProvider } from '@/components/CustomThemeProvider/CustomThemeProvider';
import ClientRedirect from '@/components/ClientRedirect/ClientRedirect';
import StoreProvider from '@/components/StoreProvider/StoreProvider';
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <title>Graphiql App</title>
        </head>
        <body className={poppins.className}>
          <CustomThemeProvider>
            <ErrorBoundary>
              {children}
              <ClientRedirect />
            </ErrorBoundary>
          </CustomThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
