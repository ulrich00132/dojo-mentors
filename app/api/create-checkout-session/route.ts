import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    bookingId: string;
}


export async function POST(
    request: Request,
    { bookingId }: IParams
) {

    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        return NextResponse.error();
    }

    
    const booking = await prisma.bookingSession.findUnique({
        where: {
            id: bookingId
        }
    });

    
    if (!booking) {
        return NextResponse.error()
    }
     
    
    const profile = await prisma.profile.findUnique({
        where: {
            id: booking?.profileId
        }
    });

    if (booking.totalPrice === null) {
        return 
    }
    const platformFee = Math.round((booking.totalPrice * 100) * 0.20)

    // // Checkout
    const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: profile?.stripeSessionProductPriceId,
            quantity: 1,
          },
        ],
        payment_intent_data: {
          application_fee_amount: platformFee,
          transfer_data: {
            destination: profile?.stripeAccountId,
          },
        },
        mode: 'payment',
        success_url: "http://localhost:3000/checkout/thank-you",
        cancel_url: "http://localhost:3000/checkout/failure",
      });

      return NextResponse.json(session)
}