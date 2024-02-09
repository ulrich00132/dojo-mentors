import { getStripeAccount } from "./getStripeAccount";
import { getBookingSessionById } from "../getBookingSessionById";
import getProfileById from "../getProfileById";
import getCurrentUser from "../getCurrentUser";

import stripe from "stripe";
import { singleLevelNestedRoutes } from "@/app/libs/routes";

interface IParams {
    bookingId: string
}

export async function createCheckoutSession(stripeAccountId: string, bookingId: IParams) {
    
    try {

        const currentUser = await getCurrentUser();
        const account = await getStripeAccount(stripeAccountId);
        
        const bookingSession = await getBookingSessionById(bookingId);
        if (!bookingSession) {
            return 
        }
        const profile = await getProfileById({mentorId: bookingSession.profileId})


        const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price: profile?.stripeSessionProductPriceId,
                quantity: 1,
              },
            ],
            payment_intent_data: {
              application_fee_amount: 123,
              transfer_data: {
                destination: profile?.stripeAccountId,
              },
            },
            mode: 'payment',
            success_url: process.env.NEXT_PUBLIC_APP_URL + singleLevelNestedRoutes.checkout.success,
            cancel_url: process.env.NEXT_PUBLIC_APP_URL + singleLevelNestedRoutes.checkout.failure,
          });

          return session.url


    } catch(error: any) {
        throw new Error("😞 Echec lors du paiement", error)
    }
    
}