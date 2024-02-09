import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getSubscriptions from "@/app/actions/getSubscriptions";
import MentoringClient from "./MentoringClient";



const SubscriptionsPage = async () => {
    
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState 
                title="⛔️ Page confidentielle"
                subtitle="Se connecter"
            />
        )
    };

    const subscriptions = await getSubscriptions({
        userId: currentUser.id
    })

    // If no booking found in db
    if (subscriptions.length === 0) {
        return (
            <EmptyState 
                title="Il semble que vous n'avez pas encore de mentors"
                subtitle="Trouvez le parfait Mentor"
            />
        )
    }
 
    return (
    <MentoringClient 
        subscriptions={subscriptions}
        currentUser={currentUser}
    />
  )
}

export default SubscriptionsPage