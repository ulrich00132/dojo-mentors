"use client";

import { useEffect, useState } from "react";
import Container from "../Container";
import Heading from "../Heading";

import { GrContactInfo } from "react-icons/gr";
import { MdCheck } from "react-icons/md";
import { PiSealWarningBold } from "react-icons/pi";
import { AiFillAlert } from "react-icons/ai";

import { SafeProfile } from "@/app/types";

import axios from "axios";
import toast from "react-hot-toast";

import CreateStripeAccountLink from "./CreateStripeAccountLink";
import { useRouter } from "next/navigation";

import Image from "next/image";

interface PaymentInfoProps {
  profile: SafeProfile;
  stripeAccountLink?: string;
  accountDetail?: any;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
  profile,
  stripeAccountLink,
  accountDetail,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const accountLink = stripeAccountLink?.toString();

  const createAccountLink = () => {
    setIsLoading(true);

    if (stripeAccountLink && accountLink) {
      router.push(accountLink);
    } else {
      console.error("Lien Stripe inexistant");
    }
  };

  return (
    <Container>
      <div className="flex flex-col gap-4">
        {profile.stripeAccountId && accountDetail.charges_enabled === true && (
          <Heading
            title="Gérez vos paiements"
            subtitle="Mettez à jour vos informations afin de recevoir vos paiements"
          />
        )}

        {profile.stripeAccountId && accountDetail.charges_enabled === false ? (
          <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2 text-rose text-2xl font-semibold">
                <AiFillAlert size={24} />
                <div>
                  Commencez à monétiser vos compétences
                </div>
              </div>
              <div className="text-neutral-600 text-center">
                Mettez à jour vos informations pour activer les paiements.
              </div>
            </div>
            <div
              className="
            aspect-square
            w-1/2
            relative
            overflow-hidden
            "
            >
              <Image
                alt="Merci"
                src={"/images/activate-payment.png"}
                fill
                className="object-cover w-full"
              />
            </div>

              <CreateStripeAccountLink
                profile={profile}
                onClick={createAccountLink}
              />
            
            <div className="w-full text-center text-neutral-600">
            {"En activant la fonctionnalité de paiement liée à votre profil de Mentor, vous acceptez les termes et conditions de "}
                <a
                  href="https://stripe.com/en-be/legal/connect-account"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-green"
                >
                  Stripe Connected
                </a>
              </div>
            
          </div>
        ) : (
          
          <div className="border-t pt-4">
            <div className="flex flex-col gap-8">
              <div className="flex justify-between text-neutral-600">
                Status compte Stripe
                {accountDetail.details_submitted === true ? (
                  <div className="flex flex-row gap-1 bg-greenLight text-green py-1 px-2 text-sm items-center">
                    <div>Actif</div>
                    <MdCheck size={20} />
                  </div>
                ) : (
                  <div className="flex flex-row gap-2 bg-roseLight text-rose p-1 text-sm items-center">
                    <div>Inactif</div>
                    <PiSealWarningBold size={20} />
                  </div>
                )}
              </div>

              <div className="flex flex-row gap-4 border-t pt-4">
                <GrContactInfo size={24} />
                <div className="font-semibold">Informations de contact</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default PaymentInfo;
