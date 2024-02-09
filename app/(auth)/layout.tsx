import '../globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';

const font = Work_Sans({ subsets: ['latin'] });

export const metadata : Metadata = {
  title: 'Log in / Sign in',
  description: 'Find a mentor who can help you grow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
      </body>
    </html>
  )
}