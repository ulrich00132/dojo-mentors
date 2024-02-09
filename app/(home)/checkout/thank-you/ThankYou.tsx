'use client';
import { routes } from "@/app/libs/routes";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";

import { SafeUser } from "@/app/types";

import axios from "axios";
import toast from "react-hot-toast";

interface ThankYouProps {
    currentUser: SafeUser | null;
}


const ThankYou: React.FC<ThankYouProps> = ({
    currentUser,
}) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            guestEmail: "",
        }
    });
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/referral', data)
        .then(() => {
            reset();
            router.push(process.env.NEXT_PUBLIC_APP_URL + routes.referral);
        })
        .catch(() => {
            toast.error("😞 Oups, Une erreur est survenue !");
        })
        .finally(() => {
            setIsLoading(false);
        })
    }


    return (
    <div className="flex flex-col items-center justify-center gap-12">
        
        {/* <div className="flex flex-col gap-4 items-center">
            <div className="text-4xl font-semibold">
                Bien joué {currentUser?.firstName}!
            </div>
            <div className="text-lg text-neutral-500">
                Tu vas encore atteindre un nouveau niveau de compétences
            </div>
        </div> */}

        <div className="flex flex-col gap-4 items-center">
            <div className="text-2xl md:text-4xl font-semibold">
                Recois 5€ de remise sur ta prochaine session
            </div>
            <div className="text-lg text-neutral-500">
                Invite un ami qui aimerait aussi devenir un maître dans son domaine.
            </div>
            <div className="w-full">
                <Input 
                    id="guestEmail"
                    label="Email de mon ami(e)"
                    register={register}
                    errors={errors}
                    required
                />

            </div>
            <Button 
                label="Recevoir 5€ sur ma session"
                onClick={handleSubmit(onSubmit)}
            />
        </div>
        {/* <div 
            className="
            aspect-square
            w-1/2
            relative
            overflow-hidden
            "
        
        >
            <Image
                alt="Merci"
                src={"/images/success.jpg"}
                fill
                className="object-cover w-full"
            />
        </div> */}
    </div>
  )
}

export default ThankYou