'use client';

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import { SafeUser } from "@/app/types";

import { LiaPiggyBankSolid } from "react-icons/lia";
import { FaRegMoneyBillAlt } from "react-icons/fa";

import axios from "axios";
import toast from "react-hot-toast";

import { useCallback, useState } from "react";
import Button from "@/app/components/Button";

import { getPayout } from "@/app/actions/stripe/getPayout";


interface WalletProps {
  currentUser: SafeUser | null;
  balance: any;
  stripeAccountId: string;
  
}

const Wallet: React.FC<WalletProps> = ({ currentUser, balance, stripeAccountId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const parsedBalance = JSON.parse(balance);

  const options = {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const pendingAmount = parsedBalance.pending[0].amount / 100;
  const formattedPendingAmount = pendingAmount.toLocaleString(
    "fr-FR",
    options
  );
  

  const pendingCurrency = parsedBalance.pending[0].currency
  const availableCurrency = parsedBalance.pending[0].currency

  const availableAmount = parsedBalance.available[0].amount / 100;
  const payoutAmount = parsedBalance.available[0].amount;
  const formattedAvailableAmount = availableAmount.toLocaleString(
    "fr-FR",
    options
  );

  const handlePayout = async () => {
    "use client";   
    alert("Vous êtes sur le point de retirer" + payoutAmount);
    
    const payout = await getPayout(
        stripeAccountId,
        payoutAmount,
    );

    toast.success("Success")
    
  }


  return (
    <Container>
      <Heading
        title="Portefeuil"
        subtitle="Gérez votre portefeuil en bon père de famille 🤑"
      />
      <div 
        className="
            pt-8
            grid
            grid-cols-1
            sm:grid-cols-1
            md:grid-cols-1
            lg:grid-cols-2
            xl:grid-cols-2
            2xl:grid-cols-2
            gap-8
            
        "
      >
        <div 
            className="
                bg-black 
                text-white 
                col-span-1 
                md-col-span-1 
                lg-col-span-4 
                p-10
            "
        >   
            <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-4 items-center">
                    <div className="w-16 h-16 bg-neutral-700 flex justify-center items-center rounded-full">
                        <LiaPiggyBankSolid size={32} />
                    </div>
                    <div className="text-lg">En cours</div>
                </div>
                <div className="text-4xl">
                    {formattedPendingAmount}
                    {pendingCurrency === "eur" && <span>€</span>}
                </div>
            </div>
        </div>

        <div 
            className="
                bg-rose 
                text-white 
                col-span-1 
                md-col-span-1 
                lg-col-span-4
                p-10
            "
        >   
            <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-4 items-center">
                    <div className="w-16 h-16 bg-roseLight flex justify-center items-center rounded-full">
                        <FaRegMoneyBillAlt size={32} />
                    </div>
                    <div className="text-lg">Disponible</div>
                </div>

                <div className="flex flex-row justify-between">
                    <div className="text-4xl">
                        {formattedAvailableAmount}
                        {availableCurrency === "eur" && <span>€</span>}
                    </div>
                    <div>
                        <Button 
                            label="Retirer"
                            onClick={handlePayout}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
        
        <div 
            className="
                bg-purple 
                text-white
                col-span-1
                lg:col-span-2
                p-10
            "
        >   
            <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-4 items-center">
                    <div className="w-16 h-16 bg-softPurple flex justify-center items-center rounded-full">
                        <LiaPiggyBankSolid size={32} />
                    </div>
                    <div className="text-lg">Sessions</div>
                </div>
                <div className="text-4xl">
                    {formattedAvailableAmount}
                    {availableCurrency === "eur" && <span>€</span>}
                </div>
            </div>
        </div>

        
      </div>
    </Container>
  );
};

export default Wallet;
