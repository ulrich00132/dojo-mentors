"use client";

import { SafeUser } from "@/app/types";
import Container from "../Container";
import stripe from "stripe";

import {
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");


interface ManageSubscriptionsProps {
  currentUser: SafeUser | null;
}

const ManageSubscriptions: React.FC<ManageSubscriptionsProps> = ({
  currentUser,
}) => {
  const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
  const [clientSecret, setClientSecret] = useState("");

  
  return (
    <Container>
      <div className="flex flex-col gap-8"></div>
    </Container>
  );
};

export default ManageSubscriptions;
