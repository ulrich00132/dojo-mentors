import Stripe from 'stripe';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';


const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "undefined");

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {


    try {
      const accountSession = await stripe.accountSessions.create({
        account: "{{CONNECTED_ACCOUNT_ID}}",
        components: {
          payments: {
            enabled: true,
            features: {
              refund_management: true,
              dispute_management: true,
              capture_payments: true,
            }
          }
        }
      });

      res.json({
        client_secret: accountSession.client_secret,
      });

      return NextResponse.json(accountSession)
    } catch (error: any) {
      
      res.status(500);
      res.send({error: error.message});
    }
  } else {
    res.status(405).end();
  }
}