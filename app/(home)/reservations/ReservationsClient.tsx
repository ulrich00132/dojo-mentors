'use client';

import toast from "react-hot-toast";
import axios from "axios";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeBookingSessions, SafeUser, SafeProfile } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ProfileCard from "@/app/components/profiles/ProfileCard";

interface ReservationsClientProps {
    bookingSession: SafeBookingSessions[];
    currentUser?: SafeUser | null;
    author?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    bookingSession,
    currentUser,
    author,
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/bookings/${id}`)
        .then(() => {
            toast.success("Session annulée");
            router.refresh()
        })
        .catch(() => {
            toast.error("Une erreur est survenue!")    
        })
        .finally(() => {
            setDeletingId('');
        })
    }, [router])

    return (
    <Container>
        <Heading 
            title="Réservations"
            subtitle="Les réservations faites par vos mentorés"
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
            {bookingSession.map((session) => (
                <ProfileCard 
                    key={session.id}
                    data={session.profile}
                    bookingSession={session}
                    actionId={session.id}
                    onAction={onCancel}
                    disabled={deletingId === session.id}
                    actionLabel="Annuler session"
                    currentUser={currentUser}
                    bookingAuthor={author}

                />
            ))}

        </div>
    </Container>
  )
}

export default ReservationsClient