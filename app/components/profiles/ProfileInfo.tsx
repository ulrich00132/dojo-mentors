'use client';

import { BsStars } from "react-icons/bs";
import { IoMdCheckmark } from 'react-icons/io';

interface ProfileInfoProps {
    expertise: string[];
    bio: string;
    successStory: string | null;

}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
    expertise,
    bio,
    successStory,
    
}) => {
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
        <hr  className="pt-4 hidden md:block"/>
        <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">Expertises</h1>
                <div className="flex flex-wrap gap-4">
                    {expertise.map((item, index) => (
                        <div key={index} className="bg-pastelRose border-2 border-rose p-2 text-sm text-black flex flex-row gap-2 items-center">
                            <IoMdCheckmark />
                            <div>
                                {item}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

           
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold">
                    Bio
                </div>
                <div className="text-neutral-700 whitespace-pre-line">
                    {bio}
                </div>
            </div>
            
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 text-xl font-semibold">
                    <BsStars size={24} />
                    Success-story
                </div>
                <div className="text-neutral-700 whitespace-pre-line">
                    {successStory}
                </div>
            </div>
            <hr  className="pt-4 hidden md:block"/>
            
            {/* REVIEWS */}
            {/* <div>
                Review section
                
            </div> */}
            
        </div>

    </div>
  )
}

export default ProfileInfo