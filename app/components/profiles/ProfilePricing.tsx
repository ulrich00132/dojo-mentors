'use client';

import { useCallback, useMemo, useState } from "react";

import Button from "../Button";

import { TbAirBalloon } from "react-icons/tb";
import { PiAirplaneTiltBold, PiChatCircleDots } from 'react-icons/pi';
import { MdOutlineRocketLaunch } from 'react-icons/md';
import { IoCallOutline, IoChatbubblesOutline } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import useMessageModal from "@/app/hooks/useMessageModal";
import MentorModal from "../modals/MentorModal";
import useCalendarModal from "@/app/hooks/useCalendarModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import useSubscribeModal from "@/app/hooks/useSusbscriptionModal";
import SubscriptionModal from "../modals/SubscriptionModal";

interface ProfilePricingProps {
    sessionPrice: number;
    growthPrice?: number | null;
    scalePrice?: number | null;
    advancedPrice?: number | null;
    chatGrowth?: string | null;
    chatScale?: string | null;
    chatAdvanced?: string | null;
    responseDelayGrowth?: number | null;
    responseDelayScale?: number | null;
    responseDelayAdvanced?: number | null;
    callGrowth?: number | null;
    callScale?: number | null;
    callAdvanced?: number | null;
    supportGrowth?: boolean | null;
    supportScale?: boolean | null;
    supportAdvanced?: boolean | null;
    menteeCount: number;
    currentUser?: SafeUser | null;
    hasMentorshipPlan?: boolean | null;
    profileId?: string | null;
    stripeGrowthPriceId?: string | null;
    stripeScalePriceId?: string | null;
    stripeAdvancedPriceId?: string | null;
    stripeGrowthProductId?: string | null; 
    stripeScaleProductId?: string | null; 
    stripeAdvancedProductId?: string | null; 

}

const ProfilePricing: React.FC<ProfilePricingProps> = ({
    sessionPrice,
    growthPrice,
    scalePrice,
    advancedPrice,
    chatGrowth,
    chatScale,
    chatAdvanced,
    responseDelayGrowth,
    responseDelayScale,
    responseDelayAdvanced,
    callGrowth,
    callScale,
    callAdvanced,
    supportGrowth,
    supportScale,
    supportAdvanced,
    menteeCount,
    currentUser,
    hasMentorshipPlan,
    profileId,
    stripeGrowthPriceId,
    stripeScalePriceId,
    stripeAdvancedPriceId,
    stripeGrowthProductId,
    stripeScaleProductId,
    stripeAdvancedProductId,
}) => {
    
    const messageModal = useMessageModal();
    const calendarModal = useCalendarModal();
    const loginModal = useLoginModal();
    const subscribeModal = useSubscribeModal();
    const mentorId = profileId

    const sendMessage = useCallback(() => {
        messageModal.onOpen()
        
    }, [MentorModal]);

    // CALENDAR BOOKING SESSION

    const showCalendar = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        
        calendarModal.onOpen();

    }, [calendarModal, currentUser])
    
    const [showSessionPrice, setShowSessionPrice] = useState(true);
    const togglePriceView = (showSessionPrice: boolean) => {
        setShowSessionPrice(showSessionPrice)
    }

    
    
    const [selectLevel, setSelectLevel] = useState("Growth");
    const togglePriceLevel = (selectLevel: string) => {
        setSelectLevel(selectLevel)
    }

    // MENTORING
        // State to store subscription modal props
    const [subscriptionModalProps, setSubscriptionModalProps] = useState({
        mentorshipPlan: selectLevel,
        price: 50,
        chat: "",
        responseDelay: 0,
        call: 0,
        support: false,
        profileId: "",
        stripePriceId: "",
        stripeProductId: "",

    });
        // Funtion to create SubscriptionModal with updatedProps
    const createSubscriptionModal = () => {
        
        return (
            <SubscriptionModal 
                mentorshipPlan={subscriptionModalProps.mentorshipPlan}
                price={subscriptionModalProps.price}
                chat={subscriptionModalProps.chat}
                responseDelay={subscriptionModalProps.responseDelay}
                call={subscriptionModalProps.call}
                support={subscriptionModalProps.support}
                profileId={subscriptionModalProps.profileId}
                stripePriceId={subscriptionModalProps.stripePriceId}
                stripeProductId={subscriptionModalProps.stripeProductId}
            />
        )
    }

    const showMentoringModal = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setSubscriptionModalProps({
            mentorshipPlan: selectLevel,
            price: selectLevel === "Growth" ? growthPrice as number : selectLevel === "Scale" ? scalePrice as number : advancedPrice as number,
            chat: selectLevel === "Growth" ? chatGrowth as string : selectLevel === "Scale" ? chatScale as string : chatAdvanced as string || "",
            responseDelay: selectLevel === "Growth" ? responseDelayGrowth as number : selectLevel === "Scale" ? responseDelayScale as number : responseDelayAdvanced as number || 0,
            call: selectLevel === "Growth" ? callGrowth as number : selectLevel === "Scale" ? callScale as number : callAdvanced as number || 0,
            support: selectLevel === "Growth" ? supportGrowth as boolean : selectLevel === "Scale" ? supportScale as boolean : supportAdvanced as boolean || false,
            profileId: mentorId || "",
            stripePriceId: selectLevel === "Growth" ? stripeGrowthPriceId as string : selectLevel === "Scale" ? stripeScalePriceId as string : stripeAdvancedPriceId as string,
            stripeProductId: selectLevel === "Growth" ? stripeGrowthProductId as string : selectLevel === "Scale" ? stripeScaleProductId as string : stripeAdvancedProductId as string,
        })
        
        subscribeModal.onOpen();

        
    }, [subscribeModal, currentUser, selectLevel])
    
    
    
    return (
    <div 
        className="
            col-span-1
            md:col-span-2
            lg:col-span-2
            xl:col-span-3
            2xl:col-span-4
            lg:static
            order-none
            lg:order-last
        "
    >
        {createSubscriptionModal()}
        {/* <div 
            onClick={sendMessage}
            className="
                flex
                flex-row
                justify-center
                items-center
                text-lg
                gap-2
                bg-white
                border-2
                border-black
                mb-4
                p-4
                font-semibold
                hover:bg-yellow
                hover:text-black
                cursor-pointer
            "
        >
            <IoChatbubblesOutline size={24} />
            <div>
                M'envoyer un message
            </div>
        </div> */}
        
        <div className="flex flex-col border-2 border-black">
            {/* PRICE MODELS */}
            <div 
                className={`
                    flex 
                    bg-black
                    p-4
                    md:p-2
                    ${hasMentorshipPlan === false ? "justify-center" : "justify-between"}
                    
                `}
            >
                <div 
                    onClick={() => togglePriceView(true)}
                    className={`
                        cursor-pointer
                        font-semibold
                        text-lg
                        ${showSessionPrice ? "text-white" : "text-neutral-500"}
                    `}
                >
                    Session
                </div>
                {hasMentorshipPlan === true && (
                    <div 
                        onClick={() => togglePriceView(false)}
                        className={`
                            cursor-pointer
                            font-semibold
                            text-lg
                            transition
                            ${!showSessionPrice ? "text-white" : "text-neutral-500"}
                        `}
                    >
                        Mentoring
                    </div>

                )}
            </div>
            {/* PRICING */}
            {showSessionPrice && (
                <div className="flex flex-row text-4xl font-semibold p-4">
                    {sessionPrice}
                    <span className="text-sm">
                        €
                    </span>
                    <div className="text-base font-normal pl-2">
                        par session
                    </div>
                </div>
            )}

            {!showSessionPrice && (

                <div className="flex justify-between bg-black px-4 md:px-2">
                    <div
                        onClick={() => togglePriceLevel("Growth")}
                        className={`
                            text-md
                            flex
                            flex-nowrap
                            items-center
                            gap-1
                            py-2
                            cursor-pointer
                            ${selectLevel === "Growth" ? "text-white" : "text-neutral-500"}
                        `}
                    >
                        <TbAirBalloon size={16}/>
                        Growth
                    </div>
                    <div
                        onClick={() => togglePriceLevel("Scale")}
                        className={`
                            text-md
                            flex
                            flex-nowrap
                            items-center
                            gap-1
                            py-2
                            cursor-pointer
                            ${selectLevel === "Scale" ? "text-white" : "text-neutral-500"}
                        `}
                    >
                        <PiAirplaneTiltBold size={16}/>
                        Scale
                    </div>
                    <div
                        onClick={() => togglePriceLevel("Avancé")}
                        className={`
                            text-md
                            flex
                            flex-nowrap
                            items-center
                            gap-1
                            py-2
                            cursor-pointer
                            ${selectLevel === "Avancé" ? "text-white" : "text-neutral-500"}
                        `}
                    >
                        <MdOutlineRocketLaunch size={16}/>
                        Avancé
                    </div>
                </div>
            )}

            {!showSessionPrice && (
                <div className="text-lg">
                    {selectLevel === "Growth" && (
                        <div className="text-neutral-600 p-4 md:p-2">
                            Assurez une croissance durable.
                        </div>
                    )}

                    {selectLevel === "Scale" && (
                        <div className="text-neutral-600 p-4 md:p-2">
                            Meilleur choix pour scaler.
                        </div>
                    )}

                    {selectLevel === "Avancé" && (
                        <div className="text-neutral-600 p-4 md:p-2">
                            Vos résultats sont sans limite.
                        </div>
                    )}
                    <hr className="h-px border-0 bg-black" />
                </div>
            )}

            <div>
                {!showSessionPrice && selectLevel && (
                    <div className="flex flex-col justify-center py-2 px-4">
                        {selectLevel === "Growth" && (
                            <div className="flex flex-row text-4xl font-semibold">
                                {growthPrice}
                                <span className="text-sm">
                                    €
                                </span>
                                <div className="text-base font-normal pl-2">
                                    par mois
                                </div>
                            </div>
                        )}
                        {selectLevel === "Scale" && (
                            <div className="flex flex-row text-4xl font-semibold">
                                {scalePrice}
                                <span className="text-sm">
                                    €
                                </span>
                                <div className="text-base font-normal pl-2">
                                    par mois
                                </div>
                            </div>
                        )}
                        {selectLevel === "Avancé" && (
                            <div className="flex flex-row text-4xl font-semibold">
                                {advancedPrice}
                                <span className="text-sm">
                                    €
                                </span>
                                <div className="text-base font-normal pl-2">
                                    par mois
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {!showSessionPrice && (
                <hr className="h-px border-0 bg-black" />

            )}
            

            {!showSessionPrice && (
                <div className="flex flex-col gap-0">
                    {chatGrowth !== null && chatScale !== null && chatAdvanced !== null && (
                        <div className="flex flex-row gap-4 px-4 py-2 text-md">
                            <PiChatCircleDots size={24} />
                            {selectLevel === "Growth" && (
                                <div>
                                    <span className="text-sm">x</span> {chatGrowth}
                                </div>
                            )}
                            {selectLevel === "Scale" && (
                                <div>
                                    <span className="text-sm">x</span> {chatScale}
                                </div>
                            )}
                            {selectLevel === "Avancé" && (
                                <div>
                                    <span className="text-sm">x</span> {chatAdvanced}
                                </div>
                            )}
                        </div>
                    )}

                    {callGrowth !== null && callScale !== null && callAdvanced !== null && (
                        <div className="flex flex-row gap-4 px-4 py-1 text-md">
                            <IoCallOutline size={24} />
                            {selectLevel === "Growth" && (
                                <div className="flex flex-nowrap gap-1 items-center">
                                    <span className="text-sm">x</span> {callGrowth} par mois
                                </div>
                            )}
                            {selectLevel === "Scale" && (
                                <div className="flex flex-nowrap gap-1 items-center">
                                    <span className="text-sm">x</span> {callScale} par mois
                                </div>
                            )}
                            {selectLevel === "Avancé" && (
                                <div className="flex flex-nowrap gap-1 items-center">
                                    <span className="text-sm">x</span> {callAdvanced} par mois
                                </div>
                            )}
                        </div>
                    ) }

                    {supportGrowth !== null && supportScale !== null && supportAdvanced !== null && (
                        <div className="flex flex-row gap-4 px-4 py-1 text-md">
                            <MdOutlineSupportAgent size={24} />
                            {selectLevel === "Growth" && (
                                <div className="flex flex-nowrap gap-1 items-center">
                                    {supportGrowth} Assistance
                                </div>
                            )}
                            {selectLevel === "Scale" && (
                                <div className="flex flex-nowrap gap-1 items-center">
                                    {supportScale} Assistance
                                </div>
                            )}
                            {selectLevel === "Avancé" && (
                                <div className="flex flex-nowrap gap-1 items-center">
                                    {supportAdvanced} Assistance
                                </div>
                            )}
                        </div>
                    ) }


                </div>
                
            )}

            <div className="p-4">
                {showSessionPrice && (
                    <Button 
                        label="Réserver maintenant"
                        onClick={showCalendar}
                        
                    />
                )}
                {!showSessionPrice && (
                    <Button 
                        label="Réserver mentoring"
                        onClick={showMentoringModal}
                        
                    />
                )}
            </div>

            <div className="flex flex-col gap-2 py-4">
                <div className="flex flex-row gap-2 px-4 font-semibold text-green">
                    <AiOutlineInfoCircle size={24} /> 
                    {menteeCount}
                    <div>places restantes</div>
                </div>
                <div className="flex flex-row gap-2 px-4 text-neutral-600">
                    <BiCheck size={24} /> 
                    <div>7 jours d{"'"}essai</div>
                </div>
                <div className="flex flex-row gap-2 px-4 text-neutral-600">
                    <BiCheck size={24} /> 
                    <div>Arrêtez quand vous le souhaitez</div>
                </div>

            </div>

        </div>
    </div>
  )
}

export default ProfilePricing