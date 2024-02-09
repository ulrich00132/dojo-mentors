'use client';

import { useEffect, useState } from "react";

import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";

const SubscriptionCheckoutForm = () => {
    const searchParams = useSearchParams();

    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string | null>(null);
    const [price, setPrice] = useState<number>();
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        if (!stripe) {
            return;
        }

        // Get Client Secret from url
        const clientSecret = searchParams?.get('cs');
        const paymentIntent = searchParams?.get('pi');

        if (!clientSecret) {
            return;
        };

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
          if (!paymentIntent) {
            return
          }
          const adjustedPrice = paymentIntent?.amount / 100
          setPrice(adjustedPrice)
        });

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
              case "succeeded":
                setMessage("Paiement réussi!");
                break;
              case "processing":
                setMessage("Paiement en cours...");
                break;
              case "requires_payment_method":
                setMessage("Veuillez compléter les informations requises.");
                break;
              default:
                setMessage("Something went wrong.");
                break;
            }
          });

    }, [stripe]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements ) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        };

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/checkout/thank-you"
            }
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message as string)
        } else {
            setMessage("Une erreur est survenue.")
        }



        setIsLoading(false);
    };

    const paymentElementOptions: any = {
        layout: "tabs"
    }
  
    return (
        <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button 
            id="submit"
            disabled={isLoading || !stripe || !elements} 
            className="bg-black w-full py-4 mt-4 text-white text-lg"
        >
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : `Souscrire ${price}€`}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message" className="mt-4">{message}</div>}
      </form>
  )
}

export default SubscriptionCheckoutForm