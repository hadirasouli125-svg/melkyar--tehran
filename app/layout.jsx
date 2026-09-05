import './globals.css';

export const metadata = {
  title: 'مدیریت یکپارچه ساختمان',
  description: 'سامانه مدرن مدیریت یکپارچه ساختمان',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
