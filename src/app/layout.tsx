import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KirayaEase Lite - Smart Rent Management',
  description: 'AI-powered rent management platform for landlords and tenants.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full bg-background">{children}</body>
    </html>
  );
}
