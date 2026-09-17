import './globals.css';

export const metadata = {
  title: 'M叽',
  description: 'M叽 iOS Web',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'M叽' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
