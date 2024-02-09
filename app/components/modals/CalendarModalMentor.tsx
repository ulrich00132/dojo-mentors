'use client';

import axios from "axios";
import { useRouter } from "next/navigation";

import { differenceInHours, eachDayOfInterval, setHours } from "date-fns";

import { SafeProfile, SafeUser } from "@/app/types";
import Modal from "./Modal";
import useCalendarModal from "@/app/hooks/useCalendarModal";
import { BookingSession } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import SessionReservation from "../profiles/SessionReservation";

interface CalendarModalProps {
    profile?: SafeProfile & {
        mentor: SafeUser
    };
    currentUser?: SafeUser | null;
    bookingSessions?: BookingSession[]
}

const CalendarModalMentor: React.FC<CalendarModalProps> = ({
    profile,
    currentUser,
    bookingSessions = [],
}) => {
    
    const initialDateRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    };

    const router = useRouter();
    const calendarModal = useCalendarModal();
    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        bookingSessions.forEach((bookingSession) => {
            const range = eachDayOfInterval({
                start: new Date(bookingSession.when),
                end: new Date(bookingSession.when)
            });

            dates = [...dates, ...range];
        });

        return dates
    }, [bookingSessions]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(profile?.sessionPrice)
    const [dateRange, setDateRange] = useState(initialDateRange);
    
    const onCreateBooking = useCallback(() => {
        setIsLoading(true);

        axios.post('/api/bookings', {
            totalPrice,
            when: dateRange.startDate,
            profileId: profile?.id
        })
        .then(() => {
            toast.success('🙌 Session réservée!')
            setDateRange(initialDateRange);
            // Redirect to / My Calendar
            router.refresh();
        })
        .catch(() => {
            toast.error("😞 Oups! Une erreur s'est produite")
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, [
        totalPrice,
        dateRange,
        profile?.id,
        router
    ]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const hourCount = differenceInHours(
                dateRange.endDate,
                dateRange.startDate
            );

            if (hourCount && profile?.sessionPrice) {
                setTotalPrice((hourCount / 2) * profile.sessionPrice)
            } else {
                setTotalPrice(profile?.sessionPrice);
            }
        }
    }, [dateRange, profile?.sessionPrice])

    
    // BODY CONTENT

    let bodyContent = (
        <div>
            The mentor calendar of {profile?.mentor.firstName}
            {/* <SessionReservation 
                price={profile?.sessionPrice}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateBooking}
                disabled={isLoading}
                disabledDates={disabledDates}
                onChangeDuration={() => { } } 
                sessionDuration={[]} 
                rangeHour={[]}                
            /> */}
        </div>
    )
  
    return (
    <Modal
        isOpen={calendarModal.isOpen}
        onClose={calendarModal.onClose}
        onSubmit={() => {}}
        title="Sélectionnez une date qui vous convient"
        actionLabel="Continuer"
        body={bodyContent}
    />
  )
}

export default CalendarModalMentor