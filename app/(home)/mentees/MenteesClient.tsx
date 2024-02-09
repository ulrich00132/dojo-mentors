'use client';

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";

import { SafeSubscriptions, SafeUser } from "@/app/types";
import SubscriptionListing from "@/app/components/subscription/SubscriptionListing";

interface MenteesClientProps {
    subscriptions: SafeSubscriptions[];
    currentUser: SafeUser | null;
    author?: SafeUser | null;
}

const MenteesClient: React.FC<MenteesClientProps> = ({
    subscriptions,
    currentUser,
    author,
}) => {
  const router = useRouter();
  const [deletingId, serDeletingId] = useState("");
  const options = {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  const onCancel = useCallback((id: string) => {

  }, []);

  
  const grossMonthlyForecast = subscriptions.reduce((total, subscription) => total + subscription.totalPrice, 0);

  const netMonthlyForecast = grossMonthlyForecast * 0.8
  const netAnnualForecast = netMonthlyForecast * 12
  const formattedNetMonthlyForecast = netMonthlyForecast.toLocaleString(
    "fr-FR",
    options
  );

  const formattedNetAnnualForecast = netAnnualForecast.toLocaleString(
    "fr-FR",
    options
  );

  
  return (
    <Container>
        <Heading 
            title="Mentoring"
            subtitle="Retrouve les abonnements de tes mentorés"
        /> 

        <div className="flex flex-col gap-8 mt-8">
            <div 
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-1
                    lg:grid-cols-3
                    xl:grid-cols-3
                    2xl:grid-cols-3
                    gap-4
                "
            
            >
                <div 
                    className="
                        flex 
                        flex-col
                        gap-8
                        border-b
                        lg:border-r
                        border-b-neutral-200
                        lg:border-b-transparent
                        p-10
                    "
                >
                    <div className="font-semibold">Total mentorés</div>
                    <div className="font-semibold text-4xl lg:text-5xl">{subscriptions.length}</div>
                </div>

                <div 
                    className="
                        flex 
                        flex-col
                        gap-8
                        border-b
                        lg:border-r
                        border-b-neutral-200
                        lg:border-b-transparent
                        p-10
                    "
                >
                    <div className="font-semibold">Prévision mensuelle</div>
                    <div className="font-semibold text-4xl lg:text-5xl">{formattedNetMonthlyForecast}€</div>
                </div>

                <div 
                    className="
                        flex 
                        flex-col
                        gap-8
                        border-b
                        lg:border-0
                        border-b-neutral-200
                        lg:border-b-transparent
                        p-10
                    "
                >
                    <div className="font-semibold">Prévision annuelle</div>
                    <div className="font-semibold text-4xl lg:text-5xl">{formattedNetAnnualForecast}€</div>
                </div>

            </div>

            <div className="flex flex-col gap-8">
                <div className="font-semibold">Vos mentorés</div>
                
                {subscriptions.map((subscription) => (
                    <div key={subscription.id}>
                        <SubscriptionListing 
                            key={subscription.id}
                            data={subscription.profile}
                            subscriptions={subscription}
                            actionId={subscription.id}
                            onAction={() => {}}
                            disabled={deletingId === subscription.id}
                            actionLabel="Abonné"
                            currentUser={currentUser}
                            subscriptionAuthor={author}
                        />
                    </div>
                ))}
            </div>
        </div>
    </Container>
  )
}

export default MenteesClient