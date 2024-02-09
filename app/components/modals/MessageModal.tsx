'use client';

import { SafeProfile, SafeUser } from "@/app/types";

import Modal from "./Modal";
import useMessageModal from "@/app/hooks/useMessageModal";

import ChatHead from "../chat/ChatHead";

import Avatar from "../Avatar";
import MultilineInput from "../inputs/MultilineInput";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



interface ProfileProps {
    profile?: SafeProfile & {
        mentor: SafeUser
    };
    currentUser?: SafeUser | null;
}


const MessageModal: React.FC<ProfileProps> = ({
    profile,
    currentUser,
}) => {
    
    
    const messageModal = useMessageModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            bodyMessage: "",
            conversationIds: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (!currentUser) {
            return null;
        }
        setIsLoading(true);

        axios.post('api/inbox', data)
        .then(() => {
            toast.success("📬 Message envoyé!")
            router.refresh();
            messageModal.onClose();
        })
        .catch(() => {
            toast.error("😞 Oups, Une erreur est survenue !")
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    
    // BODY CONTENT

    let bodyContent = (
        <div className="grid grid-cols-1">
            <ChatHead 
                avatarSrc={profile?.avatar}
                status={profile?.mentor.isAway}
                receiverName={`${profile?.mentor.firstName} ${profile?.mentor.lastName}`}
            />
            
            <div className="flex flex-col pt-2">
                <hr className="p-4"/>
                <MultilineInput 
                    id="message"
                    label="Message"
                    placeholder={`Posez une question à ${profile?.mentor.firstName} ou partagez lui un simple message...`}
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    required
                />

            </div>
        </div>
    )
    
  
    return (
    <Modal 
        isOpen={messageModal.isOpen}
        onClose={messageModal.onClose}
        onSubmit={() => {}}
        title="Envoyer un message"
        actionLabel="Envoyer"
        body={bodyContent}  
    />
  )
}

export default MessageModal