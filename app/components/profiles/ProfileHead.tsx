'use client';

import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";

import { SafeUser } from "@/app/types";
import { BiMap } from "react-icons/bi";
import Link from "next/link";
import { AiFillLinkedin, AiFillTwitterSquare, AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { TbWorld } from "react-icons/tb";

interface ProfileHeadProps {
    firstName: string;
    lastName: string;
    title: string;
    avatar: string;
    id: string;
    locationValue: string;
    currentUser?: SafeUser | null;
    expertise: string[];
    linkedIn?: string | null;
    website?: string | null;
    twitter?: string | null;
    instagram?: string | null;
    facebook?: string | null;
    company?: string | null;
    position: string
}

const ProfileHead: React.FC<ProfileHeadProps> = ({
    firstName,
    lastName,
    title,
    avatar,
    id,
    locationValue,
    currentUser,
    expertise,
    linkedIn,
    website,
    twitter,
    instagram,
    facebook,
    company,
    position
}) => {
  
    const { getByValue } = useCountries();

    const location = getByValue(locationValue);
    
    return (
    <div
        className="
            col-span-1
            md:col-span-2
            lg:col-span-4
            xl:col-span-5
            2xl:col-span-6
        "
    >
       {/* LEFT */}
        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-4
            "
        >
            <div className="col-span-1">
                <div className="aspect-square w-full relative overflow-hidden">
                    <Image 
                        fill
                        alt={`${firstName} ${lastName}`}
                        src={avatar}
                        className="
                            object-cover
                            w-full
                            h-full
                        "
                    />
                </div>
            </div>
            <div className="col-span-3 pl-4 pt-2 py-2">
                <div 
                    className="
                        flex
                        flex-col
                        justify-between
                        h-full
                        gap-6
                        md:gap-2
                    "
                
                >
                    <div className="flex flex-col gap-2">

                        <div className="text-2xl font-semibold">
                            {firstName} {lastName}
                        </div>
                        <div className="text-md text-rose font-semibold">
                            {title}
                        </div>
                        <div className="flex flex-row gap-4 text-black">
                            {website && (
                                <a href={`${website}`} target="_blank" rel="noopen noreferrer" className="hover:text-rose">
                                    <TbWorld size={20} />
                                </a>
                            )}
                            {linkedIn && (
                                <a href={`${linkedIn}`} target="_blank" rel="noopen noreferrer" className="hover:text-rose">
                                    <AiFillLinkedin size={20} />
                                </a>
                            )}
                            {twitter && (
                                <a href={`${twitter}`} target="_blank" rel="noopen noreferrer" className="hover:text-rose">
                                    <AiFillTwitterSquare size={20} />
                                </a>
                            )}
                            {facebook && (
                                <a href={`${facebook}`} target="_blank" rel="noopen noreferrer" className="hover:text-rose">
                                    <AiFillFacebook size={20} />
                                </a>
                            )}
                            {instagram && (
                                <a href={`${instagram}`} target="_blank" rel="noopen noreferrer" className="hover:text-rose">
                                    <AiFillInstagram size={20} />
                                </a>
                            )}
                            
                        </div>
                    </div>
                    <div>
                        {position} @ {company}
                    </div>
                    <div className="flex flex-row items-center text-neutral-500 gap-2">
                        <div>
                            <BiMap size={16} />
                        </div>
                        <div className="text-sm text-neutral-500">  
                            {location?.label}, {location?.region}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* RIGHT */}
        {/* <div className="bg-yellow">
            RIGHT
        </div> */}
    
    </div>
    
  )
}

export default ProfileHead