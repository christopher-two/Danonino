import type { Metadata } from 'next';
import './globals.css';
import { AppHeader } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';

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
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <AppHeader />
        <main className="flex-grow pt-16">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
