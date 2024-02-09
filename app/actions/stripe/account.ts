
import { getStripeAccount } from "./getStripeAccount";

import stripe from "stripe";

import { singleLevelNestedRoutes } from "@/app/libs/routes";
import prisma from "@/app/libs/prismadb";

interface IParams {
    stripeAccountId: string;
}


export async function createAccountLink(
    stripeAccountId: string
) {
    const account = await getStripeAccount(stripeAccountId)
    const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

    try {
        
        if (!stripeAccountId) {
            throw new Error("🤷‍♀️ Compte Stripe introuvable")
        };

        // Check if onboarding is complete
        if (account.charges_enabled === true) {
            return 
        }

        
        const stripeAccountLink = await stripe.accountLinks.create({
            account: stripeAccountId,
            refresh_url: 
              process.env.NEXT_PUBLIC_APP_URL + singleLevelNestedRoutes.account.payments,
            return_url: 
              process.env.NEXT_PUBLIC_APP_URL + singleLevelNestedRoutes.account.payments,
            type: 'account_onboarding',
          });

          return stripeAccountLink.url;
    } catch (error: any) {
        throw new Error(error)
    }
    
}