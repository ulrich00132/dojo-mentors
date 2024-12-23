import '../globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';

import Script from 'next/script';

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
      <head>
        {/* Google Analytics Tracking Code */}
        <Script 
          id='gtag'
          async 
          src="https://www.googletagmanager.com/gtag/js?id=G-WJY315KHW2">
        </Script>

        <Script id='google-analytics'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-WJY315KHW2');
          
          `}
        </Script>

        {/* Hotjar Tracking Code */}

        <Script id='hotjar'>
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3919823,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

          `}
      </Script>
        
    <script async data-website-name="dojomentors.com" src="http://localhost:3000/script.js"></script>
  
      </head>
      <body className={font.className}>
        {children}
      </body>
    </html>
  )
}
