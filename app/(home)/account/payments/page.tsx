import getCurrentUser from "@/app/actions/getCurrentUser";
import getProfileName from "@/app/actions/getProfileName";
import EmptyState from "@/app/components/EmptyState";
import PaymentInfo from "@/app/components/account/PaymentInfo";
import { createAccountLink } from "@/app/actions/stripe/account";
import { getStripeAccount } from "@/app/actions/stripe/getStripeAccount";

interface IParams {
  mentorId?: string;
}

const AccountPaymentSettings = async ({ params }: { params: IParams }) => {
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

    // Generate the Stripe account link
    if (!stripeAccountId) {
      throw new Error("Stripe Accound ID not found")
    }

    
    
    const accountLink: any = await createAccountLink(stripeAccountId);

    // Retrieve the last updated Stripe Account for current Mentor
    const stripeAccount = await getStripeAccount(stripeAccountId);
    if (!stripeAccount) {
      throw new Error("No Stripe Account found")
    }

    const plainStripAccount = JSON.parse(JSON.stringify(stripeAccount));

    return (
          <PaymentInfo 
            profile={profile} 
            stripeAccountLink={accountLink} 
            accountDetail={plainStripAccount}
          />
    );
  } catch (error) {
    return <div>{"Oups 😞! Erreur"}</div>;
  }
};

export default AccountPaymentSettings;
