'use client';

import { useCallback, useEffect, useState } from "react";
import { IconType } from "react-icons";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";


import useArray from "@/app/hooks/useArray";
import { categories } from "../navbar/Categories";

import { listOfExpertise } from "../modals/MentorModal";

import { STEPS } from "../modals/MentorModal";
import { SafeProfile } from "@/app/types";

export let updatedList: any = [];


export interface Expertises {
    expertise: string;
    topics: string[];
};



interface CategoryInputProps {
    icon: IconType;
    label: string;
    skill: Array<Expertises>
    selected?: boolean;
    onClick: (value: string[]) => void;
    onExpertiseSelect?: Expertises[];
    profile?: SafeProfile;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    icon: Icon,
    label,
    skill,
    selected,
    onClick,
    onExpertiseSelect,
    profile,
}) => {
    


    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(STEPS.EXPERTISE);


    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => (!prev));

    }, []);


    const { array, set, push, remove, filter, update, clear } = useArray([]); 

    const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});

    if (!categoryCounts[label]) {
        categoryCounts[label] = 0;
    }


    const [expertiseCount, setExpertiseCount] = useState(skill.length);

    const [totalExpertise, setTotalExpertise] = useState(0);

    // --- LIST OF EXPERTISE ----

    const allCategory = categories.find(category => category.label === label);

    const expertisePerCategory = allCategory?.skills.map((skill) => skill.expertise);
    
    const countPerCategory = expertisePerCategory?.length

    const commonExpertise = expertisePerCategory?.filter(expertise => listOfExpertise.includes(expertise));
    const commonExpertiseCount = commonExpertise?.length;

    // --------------------------

    const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);


    // Comparer clickedExpertise et expertisePerCategory
    const handleExpertiseClick = (clickedExpertise: string) => {
        if (listOfExpertise.includes(clickedExpertise)) {
            const toRemove = listOfExpertise.indexOf(clickedExpertise);
            listOfExpertise.splice(toRemove, 1);

            setSelectedExpertise(null);
            setSelectedTopics([]);
            
        } else {
            listOfExpertise.push(clickedExpertise);
            const selectedSkill = skill.find((s) => s.expertise === clickedExpertise);
            if (selectedSkill) {
                setSelectedExpertise(selectedSkill.expertise);
                setSelectedTopics(selectedSkill.topics);
            }
        }
        
        setCategoryCounts((prevCounts) => ({
            ...prevCounts,
            [label]: listOfExpertise.filter((expertise: any) => skill.includes(expertise)).length
            
        }));
        
        onClick(array); 
        
    };
    
    const [selection, setSelection] = useState({})
    const handleSelection = useCallback((expertise: string, topics: string[]) => {
        const newSelection = {expertise, topics}
    }, []);

    



    return (
    <>
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
                        <div className="
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
              
            {skill.map((skill) => (
                <div 
                    key={skill.expertise}
                    onClick={() => {
                        if(listOfExpertise.includes(skill.expertise)) {

                                const toRemove = listOfExpertise.indexOf(skill.expertise);
                                remove(toRemove);
                                onClick(listOfExpertise)
                                
                            } else {
                                push(skill.expertise);
                                
                                onClick(listOfExpertise);

                                
                            }
                            handleExpertiseClick(skill.expertise)
                            
                            onClick(listOfExpertise);
                            
                        }
                        
                    }
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
                        ${listOfExpertise.includes(skill.expertise) ? "bg-rose" : "bg-gray-100"}
                        ${listOfExpertise.includes(skill.expertise) ? "hover:bg-rose" : "hover:bg-greenLight"}
                        ${listOfExpertise.includes(skill.expertise) ? "text-white" : "text-lightBlack"}
                        ${listOfExpertise.includes(skill.expertise) ? "hover:text-white" : "hover:text-green"}
                        `}
                >
                    {skill.expertise}
                </div>

            ))}

            
        </div>
        )}
    </div>
    </div>
    </>
  )
}

export default CategoryInput