'use client';

import axios from "axios";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AiFillFacebook, AiFillGoogleSquare, AiFillLinkedin } from 'react-icons/ai';

const Register = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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

        axios.post("/api/register", data)
            .then(() => {
                registerModal.onClose();
                router.push("/")
            })
            .catch((error) => {
                toast.error("Oups! Une erreur s'est produite.")
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
    <>
        <div className="relative p-6 flex-auto">

        
      {/* BODY */}
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

                <p>En vous inscrivant, vous acceptez nos <Link href={"/"} className='linksStandard'>
                    termes et conditions
                      </Link>
                .</p>

                <div className="mb-3">
                  <Button 
                    label="Continuer"
                    onClick={handleSubmit(onSubmit)}
                  />
                </div>

            </div>

            {/* FOOTER  */}

            <div className='flex-col gap-4 mt-3 hidden'>
                <hr />
                <Button 
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
                />
                <div 
                className='
                  text-neutral-500
                  text-center
                  mt-4
                  font-light
                '

                >
                  <div className='justify-center flex flex-col items-center gap-2'>
                    <div>
                      Déjà un compte ?
                    </div>
                    <div 
                      onClick={registerModal.onClose}
                      className='links'
                    >
                      Se connecter
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register