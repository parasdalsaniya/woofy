import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Provider } from '@/lib/reactQuery-provider';
import { ThemeProvider } from '@/lib/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/layout/navbar';
import { SocketContextProvider } from '@/store/use-socket';

const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Woofy',
  description: 'A Chat App for hardcore chat lovers. 🚀',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            <SocketContextProvider>
              <Navbar />
              {children}
              <Toaster />
            </SocketContextProvider>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
