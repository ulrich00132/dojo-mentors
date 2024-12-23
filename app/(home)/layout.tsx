import '../globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';

import Navbar from '../components/navbar/Navbar';

import RegisterModal from '../components/modals/RegisterModal';
import LoginModal from '../components/modals/LoginModal';
import ForgotPasswordModal from '../components/modals/ForgotPasswordModal';
import MentorModal from '../components/modals/MentorModal';

import ToasterProvider from '../providers/ToasterProvider';

import getCurrentUser from '../actions/getCurrentUser';

import Nav from '../components/dashboard/Nav/Nav';
import SubscriptionModal from '../components/modals/SubscriptionModal';

import Script from "next/script";

const font = Work_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dojo Mentors',
  description: 'Book a mentor to blow your full potential',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  
  
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

      {/* ClickParser Tracking Code */}
    
    <script defer data-domain="dojomentors.com" src="http://localhost:3000/tracker/user-activity-tracker.js"></script>
  
      </head>
      <body className={font.className}>
        <ToasterProvider />
        <MentorModal />
        <SubscriptionModal responseDelay={0} support={false} profileId={''} stripePriceId={''} stripeProductId={''} />
        <ForgotPasswordModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {/* <Nav currentUser={currentUser} /> */}
        <div className='pb-20 pt-28'>
          {children} 
        </div>
      </body>
      <Script />
    </html>
  )
}
