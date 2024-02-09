'use client';

import axios from "axios";
import { useRouter } from "next/navigation";

import { format, eachDayOfInterval, eachHourOfInterval, startOfHour, endOfHour, getHours, getMinutes, intlFormat, differenceInHours, startOfDay, endOfDay, addHours, addMinutes} from "date-fns";

import { SafeBookingSessions, SafeProfile, SafeUser } from "@/app/types";
import Modal from "./Modal";
import useCalendarModal from "@/app/hooks/useCalendarModal";
import { BookingSession } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import SessionReservation from "../profiles/SessionReservation";
import { Range } from "react-date-range";



interface CalendarModalProps {
    profile?: SafeProfile & {
        mentor: SafeUser
    };
    currentUser?: SafeUser | null;
    bookingSessions?: SafeBookingSessions[]
    
}

const CalendarModal: React.FC<CalendarModalProps> = ({
    profile,
    currentUser,
    bookingSessions = [],
    
}) => {
    
    
    const initialDateRange = {
        startDate: new Date(),
        endDate: new Date(),
        // startHour: new Date(),
        // endHour: new Date(),
        key: 'selection'
    };

    
    const sessionDuration = [
        { value: 1, displayName: '30 min'},
        { value: 2, displayName: '60 min'},
        { value: 3, displayName: '90 min'},
        { value: 4, displayName: '120 min'}
    ]

    
    const [selectDuration, setSelectDuration] = useState<number>(1);
    const handleDurationChange = (durationId: number) => {
        setSelectDuration(durationId);
        
    };

    
    const router = useRouter();
    const calendarModal = useCalendarModal();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        bookingSessions.forEach((bookingSession) => {
            const range = eachDayOfInterval({
                start: new Date(bookingSession.when),
                end: new Date(bookingSession.when),
            });

            dates = [...dates, ...range];
        });

        return dates
    }, [bookingSessions]);

    

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(profile?.sessionPrice);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [hourRange, setHourRange] = useState(initialDateRange);

    
    // TIME SETTINGS

    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    
    
//   const handleTimeClick = (time: string) => {
//     setSelectedTime(time === selectedTime ? null : time);
//   }
  const handleTimeClick = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const newDate = new Date();
    newDate.setHours(hours);
    newDate.setMinutes(minutes);

    setSelectedTime(time === selectedTime ? null : time);
  }
  
  let items = [];
  for (var hour = 0; hour < 24; hour++) {
   items.push([hour, 0]);
   items.push([hour, 30]);
  }

  const selectedDate = new Date();
  const formatter = new Intl.DateTimeFormat("fr-FR", {
   hour: 'numeric',
   minute: 'numeric',
   hour12: false
  });

  const rangeHour = items.slice(14).map((time, index) => {
    const [hour, minute] = time;
    selectedDate.setHours(hour);
    selectedDate.setMinutes(minute);

    const formattedTime = formatter.format(selectedDate);
    const isSelected = formattedTime === selectedTime;

    return (
      <div 
        key={index}
        onClick={() => handleTimeClick(formattedTime)}
        className={`
          p-4
          border
          border-neutral-600
          text-center
          my-2
          cursor-pointer
          hover:bg-black
          hover:text-white
          ${isSelected ? "bg-black" : "bg-white" }
          ${isSelected ? "text-white" : "text-black" }
        `}  
      >
        {formattedTime}
      </div>
    )

  });
  
  const fullStartDate = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
  })

    
    // BODY CONTENT

    const selectedStartDate = dateRange.startDate;
    const selectedEndDate = dateRange.endDate;

    // Diffence in hour between 2 dates

    const exampleDate = new Date();

    const startOfDayDate = startOfDay(exampleDate);
    const endOfDayDate = endOfDay(exampleDate);

    const hoursInDay = differenceInHours(endOfDayDate, startOfDayDate)
    const hourInterval = eachHourOfInterval({
        start: startOfDayDate,
        end: endOfDayDate
    })
    

    const hourElements = hourInterval.slice(7).map((hour, index) => (
        <div key={index}>
          {format(hour, "HH:mm")}
        </div>
      ));

      // Converting selectedTime to date

      
    const today = new Date();
    let selectedDateTime = new Date(today);

    // const timestamp = selectedDateTime;
    // const myDateTime = new Date(timestamp)

    const selectedEndTime = new Date();
    // selectedEndTime.setHours(myDateTime.getHours())
    // selectedEndTime.setMinutes(myDateTime.getMinutes())


    if (dateRange && dateRange.startDate) {
        selectedDateTime = new Date(dateRange.startDate)        
    }
    
    if (selectedTime) {
        const [hours, minutes] = selectedTime?.split(":").map(Number);
        selectedDateTime.setHours(hours)
        selectedDateTime.setMinutes(minutes)   
    };
    
    const ajustedSelectHours = selectDuration / 60;
    const ajustedSelectMinutes = selectDuration * 30;
    ;
    selectedEndTime.setMinutes(selectedDateTime.getMinutes() + 30);
    

    // Updating end and start time

    const timeSelection = useMemo(() => {
        const updatedStartHour = selectedDateTime.setHours(selectedDateTime.getHours() + ajustedSelectHours);
        const updatedStartMinute = selectedDateTime.setMinutes(selectedDateTime.getMinutes() + ajustedSelectMinutes);

        const updatedEndHour = selectedDateTime.setHours(selectedDateTime.getHours() + ajustedSelectHours);
        const updatedEndMinute = selectedDateTime.setMinutes(selectedDateTime.getMinutes() + ajustedSelectMinutes);        

        return {
            updatedEndHour,
            updatedEndMinute,
            updatedStartHour,
            updatedStartMinute,

        }

    }, [selectedDateTime])

    // const disabledHours = useMemo(() => {
    //     let hours: Date[] = [];

    //     bookingSessions.forEach((bookingSession) => {
    //         const rangeHour = eachHourOfInterval({
    //             start: selectedDateTime,
    //             end: selectedEndTime,
    //         });

    //         hours = [...hours, ...rangeHour];
    //     });

    //     return hours;

    // }, [bookingSessions]);


    //  AXIOS

    const onCreateBooking = useCallback(() => {
        setIsLoading(true);

        axios.post('/api/bookings', {
            totalPrice,
            when: dateRange.startDate,
            profileId: profile?.id,
            startTime: new Date(startTimestamp),
            endTime: new Date(endTimestamp),
            duration: selectDuration as number,
        })
        .then((response) => {
            const bookingId = response.data.currentBookingSession.id
            const checkoutSessionUrl = response.data.session.url
            
            // toast.success('🙌 Session réservée!' + bookingId)
            setDateRange(initialDateRange);
            // Redirect to / My Calendar
            // router.push("/booking");

            // return axios.post('/api/create-checkout-session', {
            //     bookingId
                
            // });

            router.push(checkoutSessionUrl)



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
        router,
        selectedDateTime,
        selectedEndTime,
        currentUser,
        
    ]);

    // useEffect(() => {
    //     if (dateRange.startDate && dateRange.endDate) {
    //         const hourCount = differenceInHours(
    //             dateRange.endDate,
    //             dateRange.startDate
    //         );

    //         if (hourCount && profile?.sessionPrice) {
    //             setTotalPrice(selectDuration * profile.sessionPrice)
    //         } else {
    //             setTotalPrice(profile?.sessionPrice);
    //         }
    //     }
    // }, [dateRange, profile?.sessionPrice, selectDuration]);

    useEffect(() => {
        if (dateRange.startDate && profile?.sessionPrice) {
            setTotalPrice(selectDuration * profile.sessionPrice)
        };

    }, [profile?.sessionPrice, dateRange, selectDuration]);

    // Updated start Time
    const startTimestamp = timeSelection.updatedStartHour
    const myStartDateHour = new Date(startTimestamp)
    const myStartHour = myStartDateHour.getHours()

    
    const myStartDateMin = new Date(startTimestamp)
    const myStartMinute = myStartDateMin.getMinutes()


    // Updated end Time
    const endTimestamp = timeSelection.updatedEndHour
    const myDateHour = new Date(endTimestamp)
    const myHour = myDateHour.getHours()

    
    const myDateMin = new Date(endTimestamp)
    const myMinute = myDateMin.getMinutes()


    let bodyContent = (
        <div>
            <div className="text-xl text-neutral-600 pb-4">
                Les disponibilités de votre mentor {profile?.mentor.firstName} {profile?.mentor.lastName}
                {/* <div className="flex flex-col gap-2 pl-2">
                    <div className="text-sm bg-black text-white">
                        StartDate: {selectedStartDate?.toDateString()} - EndDate: {selectedEndDate?.toDateString()}
                         | Début: {selectedTime} - Fin:{selectedDateTime.getHours()}:{selectedDateTime.getMinutes()}

                         <div className="bg-roseLight text-black">
                            | De: {myStartHour}:{myStartMinute} à: {myHour}:{myMinute}
                         </div>
                    </div>
                    <div>
                        
                    </div>
                    
                </div> */}
                
            </div>
            <SessionReservation 
                price={profile?.sessionPrice}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateBooking}
                disabled={isLoading}
                disabledDates={disabledDates}
                sessionDuration={sessionDuration}
                onChangeDuration={handleDurationChange}
                rangeHour={rangeHour}
                // disabledHours={disabledHours}
            />
        </div>
    )
    
       
    return (
    <Modal
        isOpen={calendarModal.isOpen}
        onClose={calendarModal.onClose}
        onSubmit={onCreateBooking}
        title="Réserver une session"
        actionLabel="Continuer et payer"
        body={bodyContent}
    />
  )
}

export default CalendarModal