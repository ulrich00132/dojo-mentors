import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getSubscriptions from "@/app/actions/getSubscriptions";
import MenteesClient from "./MenteesClient";

import getUserById from "@/app/actions/getUserById";
import { SafeUser } from "@/app/types";

const MenteesPage = async () => {
    const currentUser = await getCurrentUser();

    const firstName = currentUser?.firstName;
    const lastName = currentUser?.lastName;
    const formattedFirstName= firstName?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const formattedLastName = lastName?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const slug = `${formattedFirstName}-${formattedLastName}`;

    if (!currentUser) {
        return (
            <EmptyState 
                title="⛔️ Page confidentielle"
                subtitle="Se connecter"
            />
        )
    };

    const subscriptions = await getSubscriptions({
        mentorId: slug,
    });

    if (subscriptions.length === 0 ) {
        return (
            <EmptyState 
                title="Aucun abonnement trouvé"
                subtitle="Il semble que vous n'avez pas encore d'abonné"
            />
        )
    };

    const authorId = subscriptions[0]?.userId;
    const author = await getUserById({
        userId: authorId || ""
    });

  
  return (
    <MenteesClient 
        subscriptions={subscriptions}
        currentUser={currentUser}
        author={author as SafeUser}

    />
  )
}

export default MenteesPage