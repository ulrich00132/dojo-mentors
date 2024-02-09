'use client';

import { SafeProfile, SafeSubscriptions, SafeUser } from "@/app/types"
import Image from "next/image";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { routes } from "@/app/libs/routes";

interface SubscriptionListingProps {
    data: SafeProfile & {
        mentor: SafeUser
    };
    subscriptions?: SafeSubscriptions;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    mentee?: SafeUser | null;
    profileCategory?: string[];
    subscriptionAuthor?: SafeUser | null;
}

const SubscriptionListing: React.FC<SubscriptionListingProps> = ({
    data,
    subscriptions,
    onAction,
    disabled,
    actionLabel,
    actionId,
    currentUser,
    mentee,
    profileCategory,
    subscriptionAuthor,
}) => {
    const router = useRouter();
    const mentorFirstName= data.mentor.firstName;
    const mentorLastName = data.mentor.lastName;
    const mentorFullName = `${mentorFirstName} ${mentorLastName}`;

    const expertises = data.myExpertise;
    const expertiseSlice3 = expertises.slice(3);
    const remainingExpertiseCount = expertiseSlice3.length;

    const profileUrl = process.env.NEXT_PUBLIC_APP_URL + routes.mentors + "/" + data.slug;
    

  return (
    <div 
        onClick={() => router.push(profileUrl)}
        className="flex flex-col gap-8 max-w-2xl mx-auto border-2 bg-black p-4 hover:cursor-pointer"
    >
        <div className="flex flex-row justify-between items-center gap-8">
            <div className="flex flex-row gap-8">
                <div className="aspect-square w- relative overflow-hidden w-20">
                    <Image 
                        src={data.avatar}
                        alt={`Mentor ${data.mentor.firstName} ${data.mentor.lastName}`}
                        className="
                            object-cover
                            h-full
                            w-hull
                            hover:scale-110
                            cursor-pointer
                            transition
                        "
                        fill
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div className="font-semibold text-white">{mentorFullName}</div>
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

                </div>

            </div>


            {onAction && actionLabel && (
                <div>
                    <Button 
                        label="Abonné"
                        disabled={disabled}
                        onClick={() => {}}
                        outline
                    />
                </div>
            )}

          

        </div>

    </div>
  )
}

export default SubscriptionListing