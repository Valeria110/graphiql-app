import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../styles/globalStyles.scss';
import { CustomThemeProvider } from '@/components/CustomThemeProvider/CustomThemeProvider';
import StoreProvider from '@/components/StoreProvider/StoreProvider';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'Graphiql App',
  description: 'The application which is a light-weight versions of Postman and GraphiQL combined in one app. ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={poppins.className}>
          <CustomThemeProvider>
            <ErrorBoundary>{children}</ErrorBoundary>
          </CustomThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
