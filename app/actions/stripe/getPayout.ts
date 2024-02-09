import stripe from "stripe";
import { getStripeAccount } from "./getStripeAccount";

interface IParams {
    stripeAccountId: string;
}

export async function getPayout(
    stripeAccountId : string,
    balance: number
) {
    const stripeAccount = await getStripeAccount(stripeAccountId);

    const stripeInstance = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

    try {

        // Retrieve payment
        if (!stripeAccount) {
            throw new Error("🤷‍♀️ Compte Stripe introuvable");
        };

        const payout = await stripeInstance.payouts.create(
            {
                amount: balance,
                currency: "eur",
            },
            {
                stripeAccount: stripeAccountId,
            }
        );

        // Send Email to User
        

    } catch(error: any) {
        console.log("Error: ", error)
        throw new Error(`😞 Oups une erreur est survenue, error ${error}`);

    }
 }