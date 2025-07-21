import type { Metadata } from 'next';
import { Alegreya } from 'next/font/google';
import './globals.css';
import { AppHeader } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const alegreya = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alegreya',
});

export const metadata: Metadata = {
  title: 'Dannonino',
  description: 'Un tributo a Dany',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn('dark', alegreya.variable)}>
      <head />
      <body className="font-body antialiased min-h-screen flex flex-col">
        <AppHeader />
        <main className="flex-grow">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
