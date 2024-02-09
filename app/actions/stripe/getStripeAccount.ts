
import stripe from "stripe";

export async function getStripeAccount( stripeAccountId: string ) {

    const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

    try {
        if (!stripeAccountId) {
            throw new Error("Compte Stripe inexistant");
        }

        const account = await stripe.accounts.retrieve(stripeAccountId);

        return account

    } catch (error) {
        throw new Error("Oups! Une erreur")
    }

}
