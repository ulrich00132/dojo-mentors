'use client';

import { signIn } from "next-auth/react";

import { AiFillFacebook, AiFillGoogleSquare, AiFillLinkedin } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import { 
  FieldValues,
  SubmitHandler,
  useForm 
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import useForgotPasswordModal from "@/app/hooks/useForgotPasswordModal";

import axios from "axios";




const ForgotPasswordModal = () => {
  
  const [isLoading, setIsLoading] = useState(false);

  const forgotPasswordModal = useForgotPasswordModal()
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: {
        errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
        email: '',
    }
  })

  const toggle = useCallback(() => {
    forgotPasswordModal.onClose();
    loginModal.onOpen();
  }, [forgotPasswordModal, loginModal]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post("/api/forget-password", data)
        .then(() => {
            toast.success("📩 Mail envoyé avec succès");
            forgotPasswordModal.onClose();
            loginModal.onClose();

            if (data.status === 404) {
                toast.error("This email already exists")
            }
        })
        .catch((error) => {
            toast.error("😞 Oups, une erreur est survenue", error)
            console.log(error)
        })
        .finally(() => {
            setIsLoading(false);
        })
  }

  const bodyContent = (
    <div className="flex flex-col gap-8">
        <Heading 
            title="Un trou de mémoire?"
            subtitle="Ca arrive à tout le monde 🙂. Tapez votre email pour réinitialiser votre mot de passe."
        />

        <Input 
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />

    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-8'>
      <hr />
      <div 
      className='
        text-neutral-500
        text-center
        mt-4
        font-light
      '
      
      >
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>
            Déjà un compte ?
          </div>
          <div 
            onClick={toggle}
            className='links'
          >
            Se connecter
          </div>
        </div>
      </div>
    </div>
  )
  
  return (
    <Modal 
        disabled={isLoading}
        isOpen={forgotPasswordModal.isOpen}
        title="Mot de passe oublié"
        actionLabel="Réinitialiser mon mot dep passe"
        onClose={forgotPasswordModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default ForgotPasswordModal