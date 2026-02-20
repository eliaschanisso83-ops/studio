import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'AIGameForge Pro - Mobile-First AI Game Engine',
  description: 'Forge professional games directly from your mobile device. Powered by GenAI and BYOK (Bring Your Own Key) architecture for total creative autonomy. Export to multiple platforms.',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  keywords: ['game engine', 'mobile game development', 'AI game creator', 'GDScript', 'Godot mobile', 'Genkit', 'BYOK AI', 'game creation on phone'],
  authors: [{ name: 'AIGameForge Team' }],
  manifest: '/manifest.json',
  openGraph: {
    title: 'AIGameForge Pro - Forge Worlds with Pure Thought',
    description: 'The first professional-grade game engine built for mobile creators. Architect logic, physics, and art with AI in a high-performance environment.',
    url: 'https://studio-delta-neon.vercel.app',
    siteName: 'AIGameForge Pro',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1761311985730-7d2008cf2923?q=80&w=1200&h=630&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'AIGameForge Pro Interface Preview',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIGameForge Pro | Mobile AI Engine',
    description: 'Create professional games on your phone with AI guidance. GDScript editor and neural scene architect in your pocket.',
    images: ['https://images.unsplash.com/photo-1761311985730-7d2008cf2923?q=80&w=1200&h=630&auto=format&fit=crop'],
  },
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
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful');
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body className="font-body antialiased bg-[#020202] text-foreground selection:bg-primary/30 overflow-x-hidden">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
