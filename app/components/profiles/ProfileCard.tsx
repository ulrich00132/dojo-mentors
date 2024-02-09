'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeBookingSessions, SafeProfile, SafeUser } from "@/app/types";
import { BookingSession, Profile, User } from "@prisma/client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { format } from 'date-fns';
import { fr } from "date-fns/locale";
import Image from "next/image";

import { BiMap } from 'react-icons/bi';
import{ BsChatText, BsPersonWorkspace, BsStars } from 'react-icons/bs'; 
import { AiTwotoneCalendar, AiOutlineClockCircle, AiOutlineUser, AiOutlineEuroCircle } from "react-icons/ai";
import { IoCallSharp } from "react-icons/io5";
import Button from "../Button";

import axios from "axios";

import { categories } from "../navbar/Categories";

export let cardCategories: string[] | undefined = undefined


interface ProfileCardProps {
    data: SafeProfile & {
        mentor: SafeUser
    };
    bookingSession?: SafeBookingSessions;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    bookingAuthor?: SafeUser | null;
    profileCategories?: string[];
    
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    data,
    bookingSession,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser,
    bookingAuthor,
    profileCategories
    
}) => {
  
    const [showSessionPrice, setShowSessionPrice] = useState(true);
    const togglePriceView = (showSessionPrice : boolean) => {
        setShowSessionPrice(showSessionPrice);
    }
    
    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);
    const flag = data.locationFlag;
    const expertises = data.myExpertise;
    const expertiseSlice3 = expertises.slice(3);
    const remainingExpertiseCount = expertiseSlice3.length
    const successStory = data.sucessStory?.split(' ').slice(0, 8).join(' ');
    const hasMentorship = data.hasMentorshipPlan;
    const chat = data.chatPerMonthGrowth || data.chatPerMonthScale || data.chatPerMonthAdvanced;
    const call = data.callPerMonthGrowth || data.callPerMonthScale || data.callPerMonthAdvanced;
    const support = data.supportGrowth || data.supportScale || data.supportAdvanced;
    const firstName = data.mentor?.firstName 
    const lastName = data.mentor?.lastName
    const slug = `${firstName}-${lastName}`.toLowerCase();

    const pathname = usePathname();

    const singleExpertise = data.myExpertise.map((item) => item)

    


    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }

        onAction?.(actionId)
    }, [onAction, actionId, disabled]);

    const price = useMemo(() => {
        if (bookingSession) {
            return bookingSession.totalPrice;
        }
        return data.sessionPrice
    }, [bookingSession]);


    

    const bookingSessionDate = useMemo(() => {
        if (!bookingSession) {
            return null;
        }

        const when =  new Date(bookingSession.when);
        const start = new Date(bookingSession.startTime);
        const end = new Date(bookingSession.endTime);

        // return `${format(when, 'PPP', { locale: fr }) } De ${format(start, 'HH:mm', { locale: fr })} - ${format(end, 'HH:mm', { locale: fr })}`

        return (
            <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                    <AiTwotoneCalendar />
                    {`${format(when, 'PPP', { locale: fr }) }`}

                </div>
                <div className="flex flex-row gap-2 items-center">
                    <AiOutlineClockCircle />
                    {`${format(start, 'HH:mm', { locale: fr })} - ${format(end, 'HH:mm', { locale: fr })}`}
                </div>
                
                <div className="flex flex-row gap-2 items-center">
                    <AiOutlineEuroCircle />
                    {price}€
                </div>

            </div>
        )

    }, [bookingSession]);

    const authorData = useMemo(() => {
        if (pathname === "/reservations") {
            return (
                <div className="flex flex-row items-center gap-2">
                        <AiOutlineUser />
                        {bookingAuthor?.firstName} {bookingAuthor?.lastName}
                    </div>
            )
        }

    }, [bookingAuthor]);

    // Find relevant categories
    const filteredCategories = useMemo(() => {
        if (!categories || !data.myExpertise) {
            return null;
        };

        const selectedCategories = categories.filter((category) => 
            category.skills.some((skills) => 
                data.myExpertise.some((expertise) => skills.expertise === expertise)
            )
        )

        return (
            selectedCategories   
        )
        
    }, [categories, data.myExpertise]) ;
    
    profileCategories = filteredCategories?.map((item) => item.label)
    cardCategories = categories.map((category) => category.label)
    const selectedCat = filteredCategories


    return (

    <div
        onClick={() => router.push(`/mentors/${data.slug}`)}
        className="col-span-1 cursor-pointer group border border-black bg-black relative"
    >
        <div className="flex flex-col gap-2 w-full">
            <div
                className="
                    aspect-square
                    w-full
                    relative
                    overflow-hidden
                "
            >
                <Image 
                    fill
                    alt={`Profil mentor ${data.mentor.firstName} ${data.mentor.lastName}`}
                    src={data.avatar}
                    className="
                        object-cover
                        h-full
                        w-hull
                        hover:scale-110
                        cursor-pointer
                        transition
                    "
                />
            </div>
            <div className="font-semibold text-sm px-2 text-white">
                {firstName} {lastName}
            </div>
            <div 
                className="font-semibold text-md px-2 text-rose">
                {data.profileTitle}
            </div>
            <div className="flex flex-wrap gap-4 items-center px-2">
                {expertises.slice(0, 3).map((expertise, index) => {
                    return (
                        <div 
                            key={index}
                            className="
                                text-rose
                                border
                                border-rose
                                text-xs
                                p-1
                            "
                        >{expertise}</div>
                    )
                })}
                {remainingExpertiseCount > 0 && (
                    <div className="text-xs text-rose border border-rose p-1">
                        {"+" + remainingExpertiseCount}
                    </div>
                )
                }
            </div>
            <div className="font-light text-blue px-2">
                {bookingSessionDate}
                {authorData}
            </div>
            <div
                className="text-neutral-300 text-sm px-2"
            >
                {successStory && successStory.length > 10 && (
                    successStory + "..."
                )}
                {successStory && successStory.length <= 10 && (
                    successStory
                )}
                
                {/* {filteredCategories?.map((item) => item.label).join(" ")} */}
                
                
            </div>
            
            <div className="font-semibold text-white px-2 pt-8">
                {!onAction && !actionLabel && (
                    <div className="absolute bottom-0 pb-2">
                        <div className="flex flex-row gap-1">
                            {`A partir de ${data.sessionPrice}€`}
                            <div className="font-light text-sm">
                                /session
                            </div>

                        </div>

                    </div>

                )}
                {onAction && actionLabel && (
                        <div className="pt-4 py-4 h-full">
                            <div className="block absolute bottom-2 inset-x-0 px-4">
                                <Button 
                                    disabled={disabled}
                                    small
                                    label={actionLabel}
                                    onClick={handleCancel}
                                    outline
                                />

                            </div>

                        </div>
                    )}
            </div>
            
        

        </div>

    </div>


  )
}

export default ProfileCard