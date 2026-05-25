import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

// Display / headings: Satoshi  (--font-satoshi)
// Body / UI:          Inter     (--font-inter)

// Variable font covers the full 300–900 axis, so every weight the design
// system uses (300/400/500/600/700) resolves exactly — including the 600
// SemiBold that Satoshi ships no static cut for.
export const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi/Satoshi-Variable.woff2',
      weight: '300 900',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi/Satoshi-VariableItalic.woff2',
      weight: '300 900',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-satoshi',
});

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

