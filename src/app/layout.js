import { Inter } from 'next/font/google';
import clsx from 'clsx';

import './globals.css';
import { Providers } from './providers';

import { TopBar } from '@/components/TopBar';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: 'rgb(17, 24, 39)' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={clsx('h-full antialiased', inter.variable)} suppressHydrationWarning>
      <body className="flex min-h-full bg-white dark:bg-slate-900">
        <Providers>
          <div className="flex w-full flex-col">
            <TopBar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
