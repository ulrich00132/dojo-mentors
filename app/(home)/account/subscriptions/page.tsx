
import getCurrentUser from "@/app/actions/getCurrentUser";
import ManageSubscriptions from "@/app/components/account/ManageSubscriptions";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const SubscriptionsPage = async () => {
    const currentUser = await getCurrentUser();

  return (
    <ManageSubscriptions 
        currentUser={currentUser}
    />
  )
}

export default SubscriptionsPage