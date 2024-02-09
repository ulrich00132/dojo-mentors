import React from "react";
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

export const categories = [
    {
        label: 'Marketing',
        icon: TbTargetArrow ,
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
] as const;

export const accountSettings = [
    "Expertises",
    "Location",
    "Company",
    "About",
    "Plans",
    "Social",
    "Success story"
] as const;

export const optionChatList = [
    {value: 'illimité', label: 'Illimité'},
    {value: '1', label: '1'},
    {value: '2', label: '2'},
    {value: '3', label: '3'},
    {value: '4', label: '4'},
    {value: '5', label: '5'},
    {value: '6', label: '6'},
    {value: '7', label: '7'},
    {value: '8', label: '8'},
    {value: '9', label: '9'},
] as const;

export const optionResponseList = [
    {value: 1, label: 1},
    {value: 2, label: 2},
    {value: 3, label: 3},
    {value: 4, label: 4},
    {value: 5, label: 5},
    {value: 6, label: 6},
    {value: 7, label: 7},
] as const;