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

const LoginModal = () => {
  
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const forgotPasswordModal = useForgotPasswordModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if(callback?.ok) {
        toast.success("Connexion réussie!");
        router.refresh();
        loginModal.onClose();
      }

      if(callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const showForgotPassword = useCallback(() => {
    loginModal.onClose();
    forgotPasswordModal.onOpen();
  }, [loginModal, forgotPasswordModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading 
        title='Bienvenue sur Book un Mentor'
        subtitle='Se connecter à votre compte'
      />
      
      <Input 
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="password"
        label="Mot de passe"
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <div
        onClick={showForgotPassword}
        className="font-light text-right text-neutral-700 hover:underline hover:text-rose cursor-pointer"
      >
        <p>Mot de passe oublié?</p>
      </div>

    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      {/* <Button 
        outline
        label='Continuer avec Google'
        icon={AiFillGoogleSquare}
        onClick={() => {}}
      />
      <Button 
        outline
        label='Continuer avec LinkedIn'
        icon={AiFillLinkedin}
        onClick={() => {}}
      /> */}
      <div 
      className='
        text-neutral-500
        text-center
        mt-4
        font-light
      '
      
      >
        {/*  */}
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>
            Pas encore de compte ?
          </div>
          <div 
            onClick={toggle}
            className='links'
          >
            Rejoindre BAM
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Se connecter"
      actionLabel='Continuer'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}

    />
  )
}

export default LoginModal;