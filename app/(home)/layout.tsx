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
    </html>
  )
}
