import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'مدیریت یکپارچه ساختمان',
  description: 'سامانه مدیریت یکپارچه ساختمان',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fa" dir="rtl"><body>{children}</body></html>;
}
