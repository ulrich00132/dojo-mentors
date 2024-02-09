import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";

import { getStripeBalance } from "@/app/actions/stripe/getStripeBalance";

import getProfileName from "@/app/actions/getProfileName";
import { getStripeAccount } from "@/app/actions/stripe/getStripeAccount";


import toast from "react-hot-toast";

import Wallet from "./Wallet";


interface IParams {
    mentorId?: string;
}

const WalletPage = async ({ params }: { params: IParams }) => {
    const currentUser = await getCurrentUser();

    const firstName = currentUser?.firstName;
    const lastName = currentUser?.lastName;
    const formattedFirstName = firstName
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const formattedLastName = lastName
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const slug = `${formattedFirstName}-${formattedLastName}`;

    const profile = await getProfileName({
        mentorId: slug,
    });

    const stripeAccountId = profile?.stripeAccountId;

    try {
        if (!profile) {
            return (
                <EmptyState
                    title="Il semble que vous n'êtes pas encore un Dojo Mentor 🥷"
                    subtitle="Il est encore temps de partager vos connaissances!"
                />
            );
        }

        if (!stripeAccountId) {
            return <div>Stripe Account ID not found</div>;
        };

        
        const stripeAccount = await getStripeAccount(stripeAccountId);
        if (!stripeAccount) {
            throw new Error("No Stripe Account found");
        }
        
        // Retrieve balance
        const balance = await getStripeBalance(stripeAccountId);
        const formattedBalance = JSON.stringify(balance);

        return (
                           
            <Wallet 
                currentUser={currentUser}
                balance={formattedBalance}
                stripeAccountId={stripeAccountId}
                
            />
        );
    } catch (error: any) {
        console.error("An error occurred: ", error);
        return <div>{"Oups 😞! Erreur"}</div>;
    }
};

export default WalletPage;
