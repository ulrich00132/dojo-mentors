'use client';

import { SafeProfile } from "@/app/types"
import Button from "../Button";
import { createAccountLink } from "@/app/actions/stripe/account";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface CreateStripeAccountLinkProps {
    profile: SafeProfile;
    onClick: () => void;
}


const CreateStripeAccountLink: React.FC<CreateStripeAccountLinkProps> = ({
    profile,
    onClick,
    
}) => {

    const router = useRouter();

  return (
    <div className="w-1/2 md:w-full mx-auto bg-rose">
        
        <Button 
            onClick={onClick}
            label="Activer paiement"
            outline
        />
    </div>
  )
}

export default CreateStripeAccountLink