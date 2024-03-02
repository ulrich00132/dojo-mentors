'use client';

import axios from 'axios';
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
import { signIn } from 'next-auth/react';
import {routes} from "@/app/libs/routes";


const RegisterModal = () => {
  
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
      .then(() => {
        toast.success("🙌 Inscription réussie");
        registerModal.onClose();
        loginModal.onOpen();

      })
      .catch((error) => {
          toast.error("Oups! Une erreur s'est produite.");
      })
      .finally(() => {
        setIsLoading(false);
      });

      
  }

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading 
        title='Bienvenue sur Book un Mentor'
        subtitle='Créer un compte.'
      />
      
      <div className='flex flex-wrap gap-4 sm:flex-wrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap'>
        <Input 
          id="firstName"
          label="Prénom"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input 
          id="lastName"
          label="Nom"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

      </div>
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

      <p>En vous inscrivant, vous acceptez nos <Link href={routes.terms} className='linksStandard'>
          termes et conditions
            </Link>{", "}
            <Link href={routes.privacy} className='linksStandard'>
          notre politique de confidentialité
            </Link>
            <span> ainsi que les termes et conditions de notre partenaire de paiement <a href={"https://stripe.com/en-be/legal/connect-account/recipient"} target='_blank' rel='noopener noreferrer' className='underline hover:text-green'>Stripe</a></span> 
      .</p>

    </div>
  )

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [])

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      {/* <Button 
        outline
        label='Continuer avec Google'
        icon={AiFillGoogleSquare}
        onClick={() => signIn('google')}
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
      isOpen={registerModal.isOpen}
      title="S'enregister"
      actionLabel='Continuer'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}

    />
  )
}

export default RegisterModal;