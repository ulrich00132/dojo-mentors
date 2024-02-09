import EmptyState from "@/app/components/EmptyState";
import ReservationsClient from "./ReservationsClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getBookingSessions from "@/app/actions/getBookingSessions";
import getUserById from "@/app/actions/getUserById";
import { SafeUser } from "@/app/types";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    const firstName = currentUser?.firstName;
    const lastName = currentUser?.lastName;
    const formattedFirstName= firstName?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const formattedLastName = lastName?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const slug = `${formattedFirstName}-${formattedLastName}`
    

    if (!currentUser) {
        return (
            <EmptyState 
                title="⛔️ Page confidentielle"
                subtitle="Se connecter"
            />
        )
    }

    const reservations = await getBookingSessions({
        mentorId: slug,
    });


    if (reservations.length === 0) {
        return (
            <EmptyState 
                title="Aucune réservation trouvée"
                subtitle="Il semble que vous n'avez pas encore de réservation."
            />
        )
    }

    const authorId = reservations[0]?.userId
    const author = await getUserById({
        userId: authorId || ''
    })

    if (author && authorId) {
        
        return (
            <ReservationsClient 
                bookingSession={reservations}
                currentUser={currentUser}
                author={author as SafeUser}
                
            />
        )
    }


    // return (
    //     <ReservationsClient 
    //         bookingSession={reservations}
    //         currentUser={currentUser}
    //         author={author}
            
            
            
    //     />
    // )
};

export default ReservationsPage