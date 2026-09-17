import './globals.css';
import ServiceWorker from './ServiceWorker';

export const metadata = {
  title: 'M叽',
  description: 'M叽 iOS Web',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'M叽' },
  icons: { icon: '/icon.svg', apple: '/icon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN"><body><ServiceWorker />{children}</body></html>;
}
