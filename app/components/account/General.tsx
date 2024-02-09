
import Avatar from "../Avatar";
import BodyContainer from "../BodyContainer";
import Container from "../Container";
import Heading from "../Heading";

import getCurrentUser from "@/app/actions/getCurrentUser";

import { IoIosLock } from "react-icons/io";



const General = async () => {
    
    const currentUser = await getCurrentUser();
  
    return (
    <Container>
        <Heading 
            title="General"
            subtitle="Comme votre identité ne change pas tous les jours, il faudrait une demande spéciale pour la mettre à jour."
            center
        />
        
        <div
            className="
                bg-white
                p-4
                mt-8
                max-w-4xl
                mx-auto
                flex
                flex-col
                gap-8
            "
        >
            <div className="mx-auto">
                <Avatar />

            </div>
            
            <div className="flex flex-col">
                <div 
                    className="text-xs pb-2 text-neutral-500"
                >
                    Prénom
                </div>
                <div 
                    className="
                        flex 
                        flex-row
                        justify-between
                        items-center
                        text-lg
                        font-medium
                        border-2
                        border-neutral-200 
                        p-4
                    "
                >
                    
                    {currentUser?.firstName}
                    <IoIosLock 
                        size={20} 
                        className='text-neutral-500'
                    />
                </div>
            </div>

            <div className="flex flex-col">
                <div 
                    className="text-xs pb-2 text-neutral-500"
                >
                    Nom
                </div>
                <div 
                    className="
                        flex 
                        flex-row
                        justify-between
                        items-center
                        text-lg
                        font-medium
                        border-2
                        border-neutral-200 
                        p-4
                    "
                >
                    
                    {currentUser?.lastName}
                    <IoIosLock 
                        size={20} 
                        className='text-neutral-500'
                    />
                </div>
            </div>

            <div className="flex flex-col">
                <div 
                    className="text-xs pb-2 text-neutral-500"
                >
                    Email
                </div>
                <div 
                    className="
                        flex 
                        flex-row
                        justify-between
                        items-center
                        text-lg
                        font-medium
                        border-2
                        border-neutral-200 
                        p-4
                    "
                >
                    
                    {currentUser?.email}
                    <IoIosLock 
                        size={20} 
                        className='text-neutral-500'
                    />
                </div>
            </div>

            
            
        </div>
       

    </Container>
  )
}

export default General