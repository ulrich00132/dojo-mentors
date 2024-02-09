'use client';

import useArray from "@/app/hooks/useArray";

import { categories } from "@/app/libs/data";
import { SafeProfile } from "@/app/types";
import { useCallback, useState } from "react";
import { IconType } from "react-icons";
import { FiChevronDown } from "react-icons/fi";

import { listOfExpertise } from "./MentorProfile";

interface Expertises {
    expertise: string;
    topics: string[];
}



interface EditCategoryProps {
    icon: IconType;
    label: string;
    updatedExpertises: string[];
    selected?: boolean;
    onClick: (value: string[]) => void;
    profile?: SafeProfile;
    categoriesData: any

}

const EditCategory: React.FC<EditCategoryProps> = ({
    icon: Icon,
    label,
    updatedExpertises,
    selected,
    onClick,
    profile,
    categoriesData
}) => {
    
    const { array, set, push, remove, filter, update, clear } = useArray([]); 

    // TOGGLE CATEGORIES
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    // UPDATED EXPERTISES
    const currentExpertises = profile?.myExpertise;

    // COUNT OF EXPERTISE BY CATEGORY
    const allCategory = categories.find((category) => category.label === label);
    const expertisePerCategory = allCategory?.skills.map((skill) => skill.expertise);
    const commonExpertise = expertisePerCategory?.filter(expertise => updatedExpertises.includes(expertise));
    const commonExpertiseCount = commonExpertise?.length;

    // HANDLE EXPERTISES SELECTION
    
    const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [categoryCounts, setCategoryCounts] = useState<{[key: string]: number}>({});
    
    
    const handleExpertiseClick = (clickedExpertise: string) => {
        if (updatedExpertises.includes(clickedExpertise)) {
            const toRemove = updatedExpertises.indexOf(clickedExpertise);
            updatedExpertises.splice(toRemove, 1);

            setSelectedExpertise(null);
            setSelectedTopics([]);
        } else {
            updatedExpertises.push(clickedExpertise);
            const selectedSkill = updatedExpertises;

            if (selectedSkill) {
                setSelectedExpertise(clickedExpertise);
            }
        };

        setCategoryCounts((prevCounts) => ({
            ...prevCounts,
            [label]: updatedExpertises.filter((expertise) => updatedExpertises.includes(expertise)).length
        }));

        onClick(array);
    }


  
    return (
    <div
        className={`
            border-2
            border-neutral-200
            hover:border-black
            p-4
            transition-all
            mx-auto
            bg-white
            ${isOpen ? "cursor-auto" : "hover:cursor-pointer"}
        `}
    >
        {currentExpertises}
        <div
            onClick={toggleOpen}
            className={`
                flex
                flex-col
                cursor-pointer
                hover:text-rose
                ${isOpen ? "shadow-sm" : "shadow-none"}
                ${isOpen ? "border-b-2" : "border-black"}
            `}
        >
            <div
                className={`
                    flex
                    flex-row
                    justify-between
                    ${isOpen ? "pb-3" : "pb-0"}
                
                `}
            >
                <div
                    className={`
                        flex
                        flex-row
                        items-center
                        gap-3
                        transition
                        cursor-pointer
                        w-full
                    
                    `}
                >
                    <Icon size={24} />
                    <div className="font-semibold">
                        {label}
                    </div>
                    <div
                        className="
                            inline-flex
                            items-center
                            justify-center
                            w-4 
                            h-4
                            text-xs
                            bg-gray-100
                            rounded-full
                        "
                    >
                        {commonExpertiseCount}
                    </div>
                </div>
                <div className="">
                    {isOpen && (
                        <div className="rotate-180 duration-400">
                            <FiChevronDown />
                        </div>
                        )}
                    {!isOpen && (
                        <div>
                            <FiChevronDown />
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div
            className={`
                ${isOpen ? "translate-y-O" : "translate-y-full"}
                ${isOpen ? "opacity-100" : "opacity-0"}
                ${isOpen ? "ease-in-out duration-300" : "animate-none"}
                transition-all
            `}
        >
            {isOpen && (
                <div
                    className={`
                        flex
                        flex-wrap
                        gap-3
                        mt-4
                        pl-8
                    `}
                >
                    {categoriesData
                        .find((category: any) => category.label === label)
                        ?.skills.map((skill: any, index: any) => (
                            <div
                                key={index}
                                onClick={() => {
                                    if (updatedExpertises.includes(skill.expertise)){
                                        const toRemove = updatedExpertises.indexOf(skill.expertise);;
                                        remove(toRemove);
                                        onClick(updatedExpertises)
                                    } else {
                                        push(skill.expertise);

                                        onClick(listOfExpertise);
                                    }
                                    handleExpertiseClick(skill.expertise)
                                    onClick(updatedExpertises)
                                    
                                }}
                                className={`
                                    bg-gray-100 
                                    text-lightBlack 
                                    text-sm
                                    font-medium
                                    mr-2
                                    px-3
                                    py-2.5
                                    hover:bg-greenLight
                                    hover:text-green
                                    cursor-pointer
                                    ${updatedExpertises.includes(skill.expertise) ? "bg-rose" :  "bg-gray-100"}
                                    ${updatedExpertises.includes(skill.expertise) ? "hover:bg-rose" : "hover:bg-greenLight"}
                                    ${updatedExpertises.includes(skill.expertise) ? "text-white" : "text-lightBlack"}
                                    ${updatedExpertises.includes(skill.expertise) ? "hover:text-white" : "hover:text-green"}
                                `}
                            >
                                {skill.expertise}
                            </div>
                        ))
                    
                    }

                </div>
            ) }
        </div>
    </div>
  )
}

export default EditCategory