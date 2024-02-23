'use client'

import { 
    AiOutlineMenu,
    AiOutlinePoweroff, 
    AiOutlineCalendar, 
    AiOutlineSchedule, 
    AiOutlineUser, 
    AiOutlineSetting 
    } from 'react-icons/ai';
import { BiBell } from "react-icons/bi";
import { FaUserNinja } from "react-icons/fa";
import { MdSettingsAccessibility } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";

import Avatar from '../Avatar';

import { useCallback, useState } from 'react';
import useMentorModal from '@/app/hooks/useMentorModal';

import MenuItem from './MenuItem';
import { signOut } from 'next-auth/react';

import { useRouter } from 'next/navigation';

import { routes, singleLevelNestedRoutes } from '@/app/libs/routes';

import { SafeUser } from '@/app/types';

interface UserMenuProps {
    currentUser?: SafeUser | null
}


const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const mentorModal = useMentorModal();


    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const becomeMentor = useCallback(() => {
        mentorModal.onOpen();
        setIsOpen(false);
        
    }, [mentorModal]);

    const router = useRouter();
    


  return (
    <div className="relative z-50">
        <div 
            className="
                flex
                flex-row
                items-center
                gap-3
            "
        >
            {currentUser?.isMentor === false && (
                <div 
                    onClick={becomeMentor}
                    className="
                        hidden
                        md:block
                        text-sm
                        text-white
                        font-semibold
                        py-3
                        px-4
                        border
                        border-black
                        bg-black
                        transition
                        cursor-pointer

                    
                    "
                >
                    Devenir mentor
                    
                </div>

            )}

            <div 
                className="
                flex
                flex-row
                items-center
                gap-2
                cursor-pointer
                "
            >
                {/* Notification icon bell is hidden  */}
                <div className='hidden'>
                <BiBell size={18} />
                <div 
                    className='
                        relative
                        inline-flex
                        items-center
                        justify-center
                        w-6
                        h-6
                        text-xs
                        font-bold
                        text-white
                        bg-rose
                        border-2
                        border-white
                        rounded-full
                        -top-2
                        -left-4
                    '
                >
                    20
                </div>
                </div>

            </div>

            <div
                className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    cursor-pointer
                    hover:shadow-md
                    transition
                "
                onClick={toggleOpen}
            >
                <AiOutlineMenu />
                <div className='hidden md:block'>
                    <Avatar src={currentUser?.avatar} />
                </div>
            </div>
        </div>

        {isOpen && (
            <div 
                className='
                    absolute
                    border-[1px]
                    shadow-md
                    w-[90vw]
                    md:w-[240px]
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                '
            >
                <div className='flex flex-col cursor-pointer'>
                    <>
                        {currentUser?.isMentor === false && (
                            <MenuItem 
                                onClick={becomeMentor}
                                label='Devenir Mentor'
                                icon={MdSettingsAccessibility}
                            />

                        )}
                        
                        <MenuItem 
                            onClick={() => router.push(routes.account)}
                            label='Mon profil'
                            icon={AiOutlineUser}
                        />

                        <MenuItem 
                            onClick={() => router.push(routes.booking)}
                            label='Mes sessions'
                            icon={AiOutlineSchedule}
                        />
                        <MenuItem 
                            onClick={() => router.push(routes.mentoring)}
                            label='Mentoring'
                            icon={FaUserNinja}
                        />
                        <MenuItem 
                            onClick={() => router.push(routes.reservations)}
                            label='Mes réservations'
                            icon={AiOutlineCalendar}
                        />
                        
                        <MenuItem 
                            onClick={() => router.push(routes.mentees)}
                            label='Abonnés'
                            icon={PiStudentFill}
                        />
                        {/* <MenuItem 
                            onClick={() => router.push("/dashboard")}
                            label='Paramètres'
                            icon={AiOutlineSetting}
                        /> */}

                        

                        <hr />
                        <MenuItem 
                            onClick={() => signOut()}
                            label='Déconnexion'
                            icon={AiOutlinePoweroff}
                        />
                    </>
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu