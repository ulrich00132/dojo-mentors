'use client';

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import toast from "react-hot-toast";
import axios from "axios";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ProfileCard from "@/app/components/profiles/ProfileCard";

import { SafeBookingSessions, SafeUser } from "@/app/types"


interface BookingClientProps {
    bookingSessions: SafeBookingSessions[];
    currentUser?: SafeUser | null;
}

const BookingClient: React.FC<BookingClientProps> = ({
    bookingSessions,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/bookings/${id}`)
        .then(() => {
            toast.success('Session annulée');
            router.refresh();  
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setDeletingId('');
        })
    }, [router])
  
    return (
    <Container>
        <Heading 
            title="Mes sessions"
            subtitle="Retrouve tes sessions et tes mentors"
        />
        <div
            className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            "
        >
            {bookingSessions.map((bookingSession) => (
                <ProfileCard
                    key={bookingSession.id}
                    data={bookingSession.profile}
                    bookingSession={bookingSession}
                    actionId={bookingSession.id}
                    onAction={onCancel}
                    disabled={deletingId === bookingSession.id}
                    actionLabel="Annuler session"
                    currentUser={currentUser}
                />
            ))}
        </div>
        
    </Container>
  )
}

export default BookingClient