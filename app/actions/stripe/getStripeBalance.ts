import stripe from "stripe";
import { getStripeAccount } from "./getStripeAccount";

interface IParams {
    stripeAccountId: string;
}

export async function getStripeBalance(
    stripeAccountId: string
) {
    const account = await getStripeAccount(stripeAccountId);

    const stripeInstance = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

    // const balance = await stripeInstance.balance.retrieve({
    //     stripeAccount: stripeAccountId
    // });

    try {
        if (!account) {
            throw new Error("🤷‍♀️ Compte Stripe introuvable");
        }
        
        const balance = await stripeInstance.balance.retrieve({
            stripeAccount: stripeAccountId
        });

        return balance;

    } catch (error: any) {
        throw new Error(error)
    }


}