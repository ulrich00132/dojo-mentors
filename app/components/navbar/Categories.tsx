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
    TbTruckDelivery,
 
} from "react-icons/tb";


import { 
    GiTeamUpgrade,
    GiPublicSpeaker
 } from 'react-icons/gi';

 import { SiMaterialdesignicons } from "react-icons/si";

 import { BsDatabaseUp } from "react-icons/bs";
 import { IoGlobe } from "react-icons/io5";
 import { PiBuildingsBold } from "react-icons/pi";


import { usePathname, useSearchParams } from "next/navigation";



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
            {
                expertise: "Branding",
                topics: ["Image de marque",]
            },
            {
                expertise: "Développement YouTube",
                topics: ["YouTube"]
            },
            {
                expertise: "Image de marque",
                topics: ["Branding"]
            },
            {
                expertise: "Marketing editorial",
                topics: ["Marketing editorial"]
            },
            {
                expertise: "Personal branding",
                topics: ["Personal branding"]
            },
            {
                expertise: "Storytelling",
                topics: ["Personal branding"]
            },
            {
                expertise: "Réseaux sociaux",
                topics: ["Réseaux sociaux"]
            },
            {
                expertise: "LinkedIn",
                topics: ["LinkedIn"]
            },
            {
                expertise: "Marketing digital",
                topics: ["Marketing digital"]
            },
            {
                expertise: "Inbound marketing",
                topics: ["Inbound marketing"]
            },
            {
                expertise: "Outbound marketing",
                topics: ["Outbound marketing"]
            },
            {
                expertise: "Marketing d'affiliation",
                topics: ["Marketing d'affiliation"]
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
            {
                expertise: "Media training",
                topics: ["Media training"]
            },
            {
                expertise: "Parler en public",
                topics: ["Parler en public"]
            },
            {
                expertise: "Gestion des conflits",
                topics: ["Gestion des conflits"]
            },
            {
                expertise: "Coaching",
                topics: ["Coaching"]
            },
            {
                expertise: "Maîtrise de soi",
                topics: ["Maîtrise de soi"]
            },
            {
                expertise: "Gestion du stress",
                topics: ["Gestion du stress"]
            },
            {
                expertise: "Influence",
                topics: ["Influence"]
            },
            {
                expertise: "Motivation",
                topics: ["Motivation"]
            },
            {
                expertise: "Productivité",
                topics: ["Productivité"]
            },
        ]
        
    },
    {
        label: 'E-Commerce',
        icon: TbTruckDelivery,
        description: 'Des mentors pour booster votre commerce en ligne',
        skills: [
            {
                expertise: "Marketing digital",
                topics: ["Marketing digital"]
            },
            {
                expertise: "Amazon",
                topics: ["Amazon", "e-commerce"]
            },
            {
                expertise: "Etsy",
                topics: ["Etsy"]
            },
            {
                expertise: "Shopify",
                topics: ["Shopify"]
            },
            
        ]
        
    },
    {
        label: 'Business',
        icon: PiBuildingsBold,
        description: 'Des mentors pour faire passer votre business à un autre niveau',
        skills: [
            {
                expertise: "Blogging",
                topics: ["Blogging"]
            },
            {
                expertise: "ChatGPT",
                topics: ["ChatGPT"]
            },
            {
                expertise: "Plan opérationnel",
                topics: ["Plan opérationnel"]
            },
            {
                expertise: "Stratégie des affaires",
                topics: ["Stratégie des affaires"]
            },
            {
                expertise: "Lead generation",
                topics: ["Lead generation"]
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
            {
                expertise: "SaaS",
                topics: ["SaaS"]
            },
            {
                expertise: "Vente B2B",
                topics: ["Vente B2B"]
            },
            {
                expertise: "Vente B2C",
                topics: ["Vente B2C"]
            },
            {
                expertise: "Stratégie de lancement",
                topics: ["Stratégie de lancement"]
            },
            {
                expertise: "Collaboration",
                topics: ["Collaboration"]
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
            {
                expertise: "Investissement",
                topics: ["Investissement"]
            },
            {
                expertise: "Trading",
                topics: ["Trading"]
            },
            {
                expertise: "Cryptomonnaie",
                topics: ["Cryptomonnaie"]
            },
            {
                expertise: "Blockchain",
                topics: ["Blockchain"]
            },
        ]
    },
    {
        label: 'Communication',
        icon: GiPublicSpeaker,
        description: 'Des mentors pour maîtriser votre communication',
        skills: [
            {
                expertise: "Savoir communiquer",
                topics: ["Capacité de communiquer"]
            },
            {
                expertise: "Communication du mondes des affaires",
                topics: ["Communication du mondes des affaires"]
            },
            {
                expertise: "Techniques de présentation",
                topics: ["Techniques de présentation"]
            },
            {
                expertise: "Publicité",
                topics: ["Publicité"]
            },
            {
                expertise: "Media buying",
                topics: ["Media buying"]
            },
            {
                expertise: "Networking",
                topics: ["Networking"]
            },
        ]
    },
    {
        label: 'Data science',
        icon: BsDatabaseUp,
        description: 'Des mentors pour appronfidir vos connaissance dans les sciences de la donnée',
        skills: [
            {
                expertise: "Analyse de données",
                topics: ["Analyse de données"]
            },
            {
                expertise: "Deep learning",
                topics: ["Deep learning"]
            },
            {
                expertise: "Intelligence artifielle",
                topics: ["Intelligence artifielle"]
            },
            {
                expertise: "LangChain",
                topics: ["LangChain"]
            },
            {
                expertise: "Machine learning",
                topics: ["Machine learning"]
            },
            {
                expertise: "Python",
                topics: ["Python"]
            },
            {
                expertise: "R(langage de programmation)",
                topics: ["R(langage de programmation)"]
            },
        ]
    },
    {
        label: 'Design',
        icon: SiMaterialdesignicons,
        description: 'Des mentors pour aiguiser votre sens du design',
        skills: [
            {
                expertise: "Conception de jeux",
                topics: ["Conception de jeux"]
            },
            {
                expertise: "Conception de mode",
                topics: ["Conception de mode"]
            },
            {
                expertise: "Conception graphique",
                topics: ["Graphisme"]
            },
            {
                expertise: "Décoration",
                topics: ["Décoration"]
            },
            {
                expertise: "Effets spéciaux",
                topics: ["Effets spéciaux"]
            },
            {
                expertise: "Illustration",
                topics: ["Illustration"]
            },
            {
                expertise: "Pixel art",
                topics: ["Pixel art"]
            },
            {
                expertise: "Unity",
                topics: ["Unity"]
            },
            {
                expertise: "After effects",
                topics: ["After effects"]
            },
        ]
    },
    {
        label: 'Développement web',
        icon: IoGlobe,
        description: 'Des mentors pour devenir connaître tous les secrets du développement web',
        skills: [
            {
                expertise: "Angular",
                topics: ["Angular"]
            },
            {
                expertise: "ASP.NET core",
                topics: ["ASP.NET core"]
            },
            {
                expertise: "CSS",
                topics: ["CSS"]
            },
            {
                expertise: "Tailwind CSS",
                topics: ["Tailwind CSS"]
            },
            {
                expertise: "Javascript",
                topics: ["Javascript"]
            },
            {
                expertise: "Next.js",
                topics: ["Next.js"]
            },
            {
                expertise: "Node.js",
                topics: ["Node.js"]
            },
            {
                expertise: "React.js",
                topics: ["React.js"]
            },
            {
                expertise: "Redux framework",
                topics: ["Redux framework"]
            },
            {
                expertise: "Spring boot",
                topics: ["Spring boot"]
            },
        ]
    },
];


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
        
    </Container>
  )
}

export default Categories