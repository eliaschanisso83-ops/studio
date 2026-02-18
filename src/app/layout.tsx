import type {Metadata, Viewport} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AIGameForge Pro - Mobile Engine',
  description: 'Professional mobile-first game creation platform powered by BYOK AI.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AIGameForge',
  },
};

export const viewport: Viewport = {
  themeColor: '#020202',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-[#020202] text-foreground selection:bg-primary/30 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
