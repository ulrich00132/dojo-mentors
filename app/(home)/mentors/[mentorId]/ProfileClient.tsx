'use client';

import Container from "@/app/components/Container";
import ProfileHead from "@/app/components/profiles/ProfileHead";
import ProfilePricing from "@/app/components/profiles/ProfilePricing";
import ProfileInfo from "@/app/components/profiles/ProfileInfo";

import { categories } from "@/app/components/navbar/Categories";
import { SafeBookingSessions, SafeProfile, SafeUser } from "@/app/types";
import { BookingSession } from "@prisma/client";
import { useMemo } from "react";
import MessageModal from "@/app/components/modals/MessageModal";
import CalendarModal from "@/app/components/modals/CalendarModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

interface ProfileClientProps {
    bookingSessions?: SafeBookingSessions[]
    profile: SafeProfile & {
        mentor: SafeUser
    };
    currentUser?: SafeUser | null;
}

const ProfileClient: React.FC<ProfileClientProps> = ({
    profile,
    bookingSessions = [],
    currentUser,
}) => {
    
    const category = useMemo(() => {
        return categories.find((item) => item.skills.map((skill) => skill.expertise) === profile.myExpertise)
    }, [profile.myExpertise]);

    const expertise = profile.myExpertise;

    const loginModal = useLoginModal();
    const router = useRouter();

    return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div 
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-1
                    lg:grid-cols-6
                    xl:grid-cols-8
                    2xl:grid-cols-10
                    gap-8
                    bg-white
        
                "
            >
                <ProfileHead 
                    firstName={profile.mentor.firstName}
                    lastName={profile.mentor.lastName}
                    title={profile.profileTitle}
                    avatar={profile.avatar}
                    id={profile.id}
                    locationValue={profile.locationValue}
                    currentUser={currentUser}
                    expertise={expertise}
                    linkedIn={profile.linkedIn}
                    website={profile.website}
                    twitter={profile.twitter}
                    instagram={profile.instagram}
                    facebook={profile.facebook}
                    company={profile.company}
                    position={profile.position}
                />
                <ProfilePricing 
                    sessionPrice={profile.sessionPrice}
                    growthPrice={profile.growthPrice}
                    scalePrice={profile.scalePrice}
                    advancedPrice={profile.advancedPrice}
                    chatGrowth={profile.chatPerMonthGrowth}
                    chatScale={profile.chatPerMonthScale}
                    chatAdvanced={profile.chatPerMonthAdvanced}
                    callGrowth={profile.callPerMonthGrowth}
                    callScale={profile.callPerMonthScale}
                    callAdvanced={profile.callPerMonthAdvanced}
                    supportGrowth={profile.supportGrowth}
                    supportScale={profile.supportScale}
                    supportAdvanced={profile.supportAdvanced}
                    menteeCount={profile.menteeCount}
                    currentUser={currentUser}
                    hasMentorshipPlan={profile.hasMentorshipPlan}
                    responseDelayGrowth={profile.responseDelayGrowth}
                    responseDelayScale={profile.responseDelayScale}
                    responseDelayAdvanced={profile.responseDelayAdvanced}
                    profileId={profile.id}
                    stripeGrowthPriceId={profile.stripePriceGrowthId}
                    stripeScalePriceId={profile.stripePriceScaleId}
                    stripeAdvancedPriceId={profile.stripePriceAdvancedId}
                    stripeGrowthProductId={profile.stripeProductGrowthId}
                    stripeScaleProductId={profile.stripeProductScaleId}
                    stripeAdvancedProductId={profile.stripeProductAdvancedId}
                />
                <ProfileInfo 
                    expertise={profile.myExpertise}
                    bio={profile.bio}
                    successStory={profile.sucessStory}
                />
                <MessageModal 
                    profile={profile}
                    currentUser={currentUser}
                />
                <CalendarModal 
                    profile={profile}
                    currentUser={currentUser}
                    bookingSessions={bookingSessions}
                />
            </div>
            
        </div>
    </Container>
  )
}

export default ProfileClient