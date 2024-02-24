'use client';

import Button from "../Button";
import { DiAtom } from 'react-icons/di';
import { BiMenu } from 'react-icons/bi';

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";

import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface userLoginProps {
    currentUser?: SafeUser | null;
}

const UserLogin: React.FC<userLoginProps> = ({
    currentUser
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
  
    return (
    <div className="flex items-center gap-4">
        {currentUser ? (
            <>
                
                <div className="block">
                    <UserMenu currentUser={currentUser} />
                </div>
            </>
        ) : (

            <>
                
                <Button 
                    label="S'identifier"
                    outline
                    onClick={loginModal.onOpen}
                />
                <Button 
                    label="Rejoindre"
                    onClick={registerModal.onOpen}
                />
                {
                    currentUser && (
                    <div className="block lg:hidden">
                        <BiMenu 
                            size={32}
                            className ='cursor-pointer'
                        />
                    </div>

                    )
                }
                
            </>
        )}
    </div>
  )
}

export default UserLogin