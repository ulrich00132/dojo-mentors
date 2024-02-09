"use client";

import Container from '../../Container';

import { LuLayoutDashboard, LuWallet } from 'react-icons/lu';
import { TbUserCog, TbSettings } from "react-icons/tb";
import { BiBell } from "react-icons/bi";
import { RiBankLine } from "react-icons/ri";
import { MdOutlineRepeat } from "react-icons/md";

import MenuBox from '../MenuBox';
import { User } from '@prisma/client';
import { usePathname } from 'next/navigation';
import BodyContainer from '../../BodyContainer';
import { SafeUser } from '@/app/types';

import { singleLevelNestedRoutes } from '@/app/libs/routes';

interface NavProps {
    currentUser?: SafeUser | null;
};

export const dashboardMenu = [

    {
        label: 'General',
        icon: LuLayoutDashboard,
        pathname: '/account',
    },
    {
        label: 'Mon Dojo',
        icon: TbUserCog,
        pathname: "/account/mentorship",
    },
    {
        label: 'Paiements',
        icon: RiBankLine,
        pathname: '/account/payments'
    },
    {
        label: 'Portefeuil',
        icon: LuWallet,
        pathname: singleLevelNestedRoutes.account.wallet
    },
    {
        label: 'Abonnements',
        icon: MdOutlineRepeat,
        pathname: '/account/subscriptions'
    },
    {
        label: 'Notifications',
        icon: BiBell,
        pathname: '/dashboard/settings'
    },
    {
        label: 'Paramètres',
        icon: TbSettings,
        pathname: '/dashboard/settings'
    },

];


const Nav: React.FC<NavProps> = ({
    currentUser,
}) => {
    
    const urlPathName = usePathname();
   
    return (

     <div 
        className='
            fixed 
            w-full
            shadow-sm
            bg-white
        '
    >
        <div className='border-b-[1px] overflow-x-auto'>

            <Container>
                <div className='
                    flex
                    flex-row
                    items-center
                    gap-8
                    md:gap-4
                    pt-4
                    
                    '>
                    {dashboardMenu.map((item) => (
                        <MenuBox
                            key={item.label} 
                            icon={item.icon}
                            label={item.label}
                            pathname={item.pathname}
                            selected={urlPathName === item.pathname}
                        />
                        ))}
                </div>
            </Container>

        </div>

    </div>

    
  )
}

export default Nav