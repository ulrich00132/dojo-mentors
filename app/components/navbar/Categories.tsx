'use client';

import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { FiFilter } from "react-icons/fi";

import { 
    TbTargetArrow,
    TbCrown,
    TbRocket,
    TbPigMoney,
    TbCategory2,
    TbClick,
    TbBusinessplan,
    TbClockBolt,
 
} from "react-icons/tb";

import { GiTeamUpgrade } from 'react-icons/gi';


import { usePathname, useSearchParams } from "next/navigation";



export const categories = [
    {
        label: 'Marketing',
        icon: TbTargetArrow,
        description: 'Des mentors experts en marketing',
        skills: [
            {
                expertise: "SEO", 
                topics: ["Blogging", "Mailchimp", "Newsletter"]
            },
            {
                expertise: "SEA",
                topics: ["Google analytics", "Publicité"]
            },
            {
                expertise: "Growth hacking",
                topics: ["Stratégie marketing", "Startup"]
            },
        ]
    },
    {
        label: 'Leadership',
        icon: TbCrown,
        description: 'Des mentors pour faire ressortir votre leadership',
        skills: [
            {
                expertise: "Problem solving",
                topics: ["Prise de parole", "Coaching", "Management"]
            },
            {
                expertise: "Decision-making",
                topics: ["Analyse d'une situation", "Management", "Savoir écouter"]
            },
        ]
        
    },
    {
        label: 'Startup',
        icon: TbRocket,
        description: 'Des mentors pour vous accompagner dans le succès de votre startup',
        skills: [
            {
                expertise: "MVP",
                topics: ["Validation de son idée", "Mise en place d'une MVP"]
            },
            {
                expertise: "Pitch",
                topics: ["Estimer la taille de son marché", "Passer de 0 à 1"]
            },
        ]
        
    },
    {
        label: 'Finance',
        icon: TbPigMoney,
        description: 'Des mentors pour vous accompagner dans le succès de votre startup',
        skills: [
            {
                expertise: "Levée de fonds",
                topics: ["Startup", "Indépendants", "Fond de roulement", "Gestion des dettes"]
            },
            {
                expertise: "Gestion de risque",
                topics: ["Finances personnelles", "Négociation d'actions", "Services bancaires d'investissement"]
            },
        ]
    },
]


const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    const selectedCategory = categories.find((item) => item.label === category);

    
    if (!isMainPage) {
        return null;
    }
  
    return (
    <Container>
        <div
            className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
            "
        >
            {categories.map((item) => (
                <CategoryBox 
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                    selected={category === item.label}
                />
            ))}


        </div>
        {/* <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-4 text-sm">
                {selectedCategory?.skills.map((skill, index) => (
                    <div
                        key={index}
                        className="
                            flex
                            flex-row
                            items-center
                            border
                            border-black
                            px-2
                            cursor-pointer
                        "
                    >
                        {skill.expertise}
                    </div>
                ))}

            </div>
        
            <div className="flex flex-row items-center gap-2 text-sm p-1 cursor-pointer">
                <FiFilter 
                    size={16}
                />
                <div>
                    Filtre
                </div>
            </div>
                


        </div> */}
    </Container>
  )
}

export default Categories