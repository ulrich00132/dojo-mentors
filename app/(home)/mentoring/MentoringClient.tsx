"use client";

import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";

import { SafeSubscriptions, SafeUser } from "@/app/types";
import SubscriptionListing from "@/app/components/subscription/SubscriptionListing";

interface MentoringClientProps {
  subscriptions: SafeSubscriptions[];
  currentUser: SafeUser | null;
}

const MentoringClient: React.FC<MentoringClientProps> = ({
  subscriptions,
  currentUser,
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");
    
    const onCancel = useCallback((id: string) => {

    }, [router]);
  
    return (
    <Container>
      <Heading 
        title="Mentoring"
        subtitle="Retrouve ici tes abonnements et tes mentors"
      />
      <div className="flex flex-col gap-8">
        {subscriptions.map((subscription) => (
            <div key={subscription.id} className="mt-10">
                <SubscriptionListing 
                  key={subscription.id}
                  data={subscription.profile}
                  subscriptions={subscription}
                  actionId={subscription.id}
                  onAction={() => {}}
                  disabled={deletingId === subscription.id}
                  actionLabel="Abonné"
                  currentUser={currentUser}
                />
            </div>
        ))}
      </div>
    </Container>
  );
};

export default MentoringClient;
