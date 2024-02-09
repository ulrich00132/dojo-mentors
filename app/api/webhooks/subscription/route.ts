import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { stripe } from "@/app/libs/stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event

    try {
        event = Stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch(error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    // let subscription: Stripe.Subscription | null = null;
    
    // Get stripeSubscription
    const session = event.data.object as Stripe.Subscription;

    
    // console.log("Current Session: ", session, session);
    
    if (!session) {
        return new NextResponse("Session introuvable!");
    }

    // if (event.type === "payment_intent.succeeded") {
        
        // await prisma.subscription.update({
        //     where: {
        //         id: session?.metadata?.subscriptionId
        //     },
        //     data: {
        //         isActive: true,
        //     }
        // });

    // }


    // if (event.type === "payment_method.attached") {
    //     const paymentMethod = event.data.object;
        
    //     await prisma.subscription.update({
    //         where: {
    //             id: session?.metadata?.bookingSessionId
    //         },
    //         data: {
    //             paymentMethodId: paymentMethod.id,
    //         }
    //     });
    // }
    
    switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
        //   console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`, paymentIntent);
          // Then define and call a method to handle the successful payment intent.
          // handlePaymentIntentSucceeded(paymentIntent);

          await prisma.subscription.update({
            where: {
                id: paymentIntent.metadata.subscriptionId
            },
            data: {
                isActive: true,
                paymentMethodId: paymentIntent.payment_method as string
            }
         });
          break;
        case 'payment_method.attached':
          const paymentMethod = event.data.object;
          // Then define and call a method to handle the successful attachment of a PaymentMethod.
          // handlePaymentMethodAttached(paymentMethod);

          await prisma.subscription.update({
            where: {
                id: paymentMethod?.metadata?.subscriptionId
            },
            data: {
                paymentMethodId: paymentMethod.id
            }
         });

          break;
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`);
      }

    return new NextResponse(null, { status: 200 })
}