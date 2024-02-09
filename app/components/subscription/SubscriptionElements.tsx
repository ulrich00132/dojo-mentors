'use client';

import SubscriptionCheckoutForm from "./SubscriptionCheckoutForm";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import Logo from "../navbar/Logo";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "")

const SubscriptionElements = () => {
    const searchParams = useSearchParams();

    const currentClientSecret = searchParams?.get('cs');

    const [clientSecret, setClientSecret] = useState(currentClientSecret);
    const appearance = {
        theme: 'stripe',
      };
      const options: any = {
        clientSecret,
        appearance,
      };

    return (
    <div className="flex flex-col gap-8 items-center justify-center border p-8 shadow-lg">
        <div>
            <Logo width={100} height={100} />
        </div>
        <div className="text-lg border-b-2 border-solid w-full text-center text-neutral-700">
            Abonnement Mentoring
        </div>
        <Elements options={options} stripe={stripePromise}>
          <SubscriptionCheckoutForm />
        </Elements>
    </div>
  )
}

export default SubscriptionElements