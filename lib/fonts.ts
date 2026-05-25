import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

// Display / headings: HK Grotesque  (--font-hk-grotesque)
// Body / UI:          Inter          (--font-inter)

export const hkGrotesque = localFont({
  src: [
    {
      path: '../public/hk-grotesk/WEB/HKGrotesk-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/hk-grotesk/WEB/HKGrotesk-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/hk-grotesk/WEB/HKGrotesk-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/hk-grotesk/WEB/HKGrotesk-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/hk-grotesk/WEB/HKGrotesk-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-hk-grotesque',
});

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

