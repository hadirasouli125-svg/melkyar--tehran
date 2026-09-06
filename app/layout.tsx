import type { Metadata, Viewport } from 'next';
import './globals.css';
import MobileDrawerController from '@/components/MobileDrawerController';

export const metadata: Metadata = {
  title: 'مدیریت یکپارچه ساختمان',
  description: 'سامانه مدیریت یکپارچه ساختمان',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fa" dir="rtl"><body>{children}<MobileDrawerController /></body></html>;
}
