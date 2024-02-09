'use client';

import Image from "next/image";
import Logo from "@/app/components/navbar/Logo";
import styles from "@/app/styles/styles.module.css";


import { signIn } from "next-auth/react";
import axios from "axios";

import Link from "next/link";

import { useCallback, useEffect, useState, useRef } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";

import Input from "@/app/components/inputs/Input";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";


import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import ToasterProvider from "@/app/providers/ToasterProvider";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { routes, singleLevelNestedRoutes } from "@/app/libs/routes";



import { useSession } from "next-auth/react";

const ResetPasswordPage = ({params}: any) => {
  
  console.log(params.token)
  
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);
  const userRef = useRef(null);

//   const { data: session, status: sessionStatus } = useSession();
//   useEffect(() => {
//     if (session) {
//         return (
//             router.push(singleLevelNestedRoutes.account.profile)
            
//         )
//     }
//   }, [])

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "", // Pass userData here
      password: "",
    },
  });

  
  // Check if token matches
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post("/api/verify-token", { token: params.token });
  
        if (response.status === 200) {
          // Token verification successful
          setVerified(true);
          const userData = await response.data;
          setUser(userData);

          // Use the reset function to set defaultValues
          reset({
            email: userData.email,
            
          })
        } 

        if (response.status === 400) {
            toast.success("Lien invalide ou expiré")
            setVerified(true);
        }
      } catch (error) {
        toast.error("Lien invalide ou expiré");
        console.error("Error: ", error);
        setIsLoading(true);
      } finally {
        // setIsLoading(false);
      }
    };
    verifyToken();
  }, [params.token, user, reset]);

  useEffect(() => {
    userRef.current = user;
  }, [user])
  
  
//   const {
//     register,
//     handleSubmit,
//     formState: {
//       errors,
//     },
//     reset,
//   } = useForm<FieldValues>({
//     defaultValues: {
//       email: "", // Pass userData here
//       password: "",
//     },
//   });

  console.log("currentUser: ", user);

  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const userData = await userRef.current;
    

    await  axios.post("/api/reset-password", data)
          .then(() => {
              toast.success("🙌 Mot de passe mis à jour!")
              router.push(routes.signIn)
          })
          .catch((error) => {
              toast.error("😞 Oups! Une erreur s'est produite. Réessayez!", error);
          
              console.log(JSON.stringify(userData))
          })
          .finally(() => {
              setIsLoading(false);
          })
    
    
  }

  
  return (
    <div 
      className="
        h-screen
        flex
        flex-row
        items-center
        justify-center
        bg-white
        md:bg-softGrey
      "
    >
      <ToasterProvider />
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          bg-white
          border-0
          md:border-2
          md:border-black
          p-8
        "
      >
        <div className="mb-16">
          <Logo 
            width={100}
            height={100}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <Heading 
            title='Bienvenue sur Book un Mentor'
            subtitle='Modifier mon mot de passe'
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

          <Button 
            label="Continuer"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          />
          
          <div className="flex flex-col mt-4">
            <div className="font-light text-green cursor-pointer">
              <Link href={routes.resetPassword}>
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="font-light text-black mt-2 hover:text-rose">
              <Link href={routes.signUp}>
                Pas encore membre? Créer un compte.
              </Link>
            </div>

          </div>
        </div>
        

      </div>
      

    </div>
  )
}

export default ResetPasswordPage