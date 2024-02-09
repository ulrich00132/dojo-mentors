import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getBookingSessions from "@/app/actions/getBookingSessions";
import BookingClient from "./BookingClient";



const BookingPage = async () => {
  
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState 
                title="⛔️ Page confidentielle"
                subtitle="Se connecter"
            />
        )
    }

    const bookingSessions = await getBookingSessions({
        userId: currentUser.id
    });

    if (bookingSessions.length === 0) {
        return (
            <EmptyState 
                title="Aucune réservation trouvée"
                subtitle="Il semble que vous n'ayez aucune réservation"
            />
        )
    }

    return (
        <BookingClient 
            bookingSessions={bookingSessions}
            currentUser={currentUser}
        />
    )
}

export default BookingPage