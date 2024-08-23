import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
// import Header from '@/components/Header/Header';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../styles/globalStyles.scss';
import Footer from '@/components/Footer/Footer';
import { CustomThemeProvider } from '@/components/CustomThemeProvider/CustomThemeProvider';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'Graphiql App',
  description: 'The application which is a light-weight versions of Postman and GraphiQL combined in one app. ',
};

// TODO: return header

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CustomThemeProvider>
          {/* <Header /> */}
          <ErrorBoundary>{children}</ErrorBoundary>
          <Footer />
        </CustomThemeProvider>
      </body>
    </html>
  );
}
