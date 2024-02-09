'use client';
import Heading from "../Heading";
import Modal from "./Modal";
import useSubscribeModal from "@/app/hooks/useSusbscriptionModal";
import { useParams, useRouter } from "next/navigation";

import { IoCallOutline, IoChatbubblesOutline } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";
import { PiChatCircleDots, PiClockCountdown } from "react-icons/pi";


import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { singleLevelNestedRoutes } from "@/app/libs/routes";
import { useCallback, useState, useEffect } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { SafeProfile } from "@/app/types";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

interface SusbcriptionModalProps {
  mentorshipPlan?: string;
  price?: number;
  chat?: string;
  responseDelay: number;
  call?: number;
  support: boolean;
  profileId: string;
  stripePriceId: string;
  stripeProductId: string;

}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const SubscriptionModal: React.FC<SusbcriptionModalProps> = ({
  mentorshipPlan,
  price,
  chat,
  responseDelay,
  call,
  support,
  profileId,
  stripePriceId,
  stripeProductId
}) => {
  
  const subscribeModal = useSubscribeModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  
  const [clientSecret, setClientSecret] = useState(""); 

  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   watch,
  //   formState: {
  //     errors,
  //   },
  //   reset
  // } = useForm<FieldValues>({
  //   defaultValues: {
  //     plan: mentorshipPlan,
  //     totalPrice: price,
  //     chat: chat,
  //     responseDelay: responseDelay,
  //     call: call,
  //     support: support
  //   }
  // });

  const onCreateSubscription = useCallback(() => {
    setIsLoading(true);

    axios.post('/api/subscriptions', {
      plan: mentorshipPlan,
      totalPrice: price,
      chat: chat,
      responseDelay: responseDelay,
      call: call,
      support: support,
      profileId: profileId,
      stripeProductId: stripeProductId,
      stripePriceId: stripePriceId
    })
    .then((response) => {
      // const checkoutSessionUrl = response.data.stripeSubscription.url;
      const clientSecret = response.data.paymentIntent.client_secret;
      const paymentIntent = response.data.paymentIntent.id;
      router.push(`/subscription?pi=${paymentIntent}&cs=${clientSecret}`);
    })
    .catch(() => {
      toast.error("😞 Oups, Une erreur est survenue !")
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [
    mentorshipPlan,
    price,
    chat,
    responseDelay,
    call,
    support,
    profileId
  ])

  
  let bodyContent = (
    <div className="flex flex-col justify-center gap-8">
        <Heading 
            title="Mentoring"
            subtitle="Un accompagnement à long terme pour atteindre vos objectifs."
        />

        <div
          className="
            flex
            flex-col
            gap-4
            
          "
        >
          {/* Type of selected Plan */}
          <div className="flex flex-row justify-between text-xl font-semibold border-b-2 border-solid border-neutral-700 pb-2">
            <div>Plan</div>
            <div>{mentorshipPlan}</div>
          </div>

          {/* SERVICE DETAILS */}
          <div className="flex flex-col justify-center divide-y divide-dashed divide-neutral-400 border-b-2 border-solid border-neutral-700">
            {/* Messages */}
            <div className="flex flex-row justify-between items-center text-lg py-4">
              <div className="flex flex-row gap-2 items-center">
                <PiChatCircleDots size={22} />
                <div>Messages</div>
              </div>
              {chat === "Illimité" && (
                <div>{chat}</div>
              )}
              {chat !== "Illimité" && (
                <div><span className="text-sm">x </span>{chat}</div>
              )}
            </div>
            
            {/* Response Delay */}
            <div className="flex flex-row justify-between items-center text-lg py-4">
              <div className="flex flex-row gap-2 justify-center items-center">
                <PiClockCountdown size={22} />
                <div>Délai maximum de réponse</div>
              </div>
              {responseDelay > 1 ? (
                <div>{responseDelay} jours</div>
              ): (
                <div>{responseDelay} jour</div>
              )}
            </div>
            
            {/* Call */}
            <div className="flex flex-row justify-between items-center text-lg py-4">
              <div className="flex flex-row gap-2 justify-center items-center">
                <IoCallOutline size={22} />
                <div>Appels</div>
              </div>
              <div><span className="text-sm">x </span>{call}</div>
            </div>

            {/* Support */}
            <div className="flex flex-row justify-between items-center text-lg py-4">
              <div className="flex flex-row gap-2 justify-center items-center">
                <MdOutlineSupportAgent size={22} />
                <div>Assistance</div>
              </div>
              {!support && (
                <div><span className="text-sm">-</span>{support}</div>
              )}
              {support && (
                <div>Inclus</div>
              )}
            </div>
          </div>
        </div>
        
        {/* TOTAL */}
        <div className="flex flex-row justify-between text-xl font-semibold">
            <div>Total</div>
            <div>{price}€ /mois</div>
          </div>
    </div>
  )
    return (
    <Modal 
        isOpen={subscribeModal.isOpen}
        onClose={subscribeModal.onClose}
        onSubmit={onCreateSubscription}
        actionLabel="Continuer"
        body={bodyContent}
        title="Session régulière"
    />
  )
}

export default SubscriptionModal