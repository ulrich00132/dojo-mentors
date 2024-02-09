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

    const session = event.data.object as Stripe.Checkout.Session
    if (!session) {
        return new NextResponse("Session introuvable!");
    }

    if (event.type === "checkout.session.completed") {
        const line_items = await stripe.checkout.sessions.listLineItems(
            event.data.object.id
        );

        
        await prisma.bookingSession.update({
            where: {
                id: session?.metadata?.bookingSessionId
            },
            data: {
                isComplete: true
            }
        });


        //   Create a customer
        const userFirstName = session?.metadata?.userFirstName as string;
        const userLastName = session?.metadata?.userLastName as string;
        const userFullName = `${userFirstName} ${userLastName}`;
        const stripeCustomerId = session?.metadata?.stripeCustomerId

        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                name: userFullName,
                email: session.metadata?.email,
                metadata: {
                    userId: session?.metadata?.userId!
                },
                
            
            });
    
            await prisma.user.update({
                where: {
                    id: session?.metadata?.userId
                },
                data: {
                    stripeCustomerId: customer.id
                }
            }) 
            
        }


        // const setupIntentId = event.data.object.setup_intent;
        // if (!setupIntentId) {
        //     return new NextResponse("Setup Intent ID not found in the event object!");
        // }

        
        
        // const setupIntent = await stripe.setupIntents.retrieve(setupIntentId as string)
        // console.log("Setup Intent: ", setupIntent)
            
    
        // const currentPaymentMethod = setupIntent.payment_method as string;

        // const setupIntent = await stripe.setupIntents.create({
        //     payment_method_types: ['card'],
        //   });

        // const currentSetupIntent = await stripe.setupIntents.retrieve(setupIntent.id);
        // const currentPaymentMethod = currentSetupIntent.payment_method as string
          
        
        // await stripe.paymentMethods.attach(currentPaymentMethod, {
        //     customer: customer.id
        // });
        // await stripe.customers.update(customer.id, {
        //     invoice_settings: {
        //         default_payment_method: currentPaymentMethod
        //     }
        // })
        // if (currentPaymentMethod === session?.metadata?.paymentMethodId) {
        //     return 
        // }
        

        console.log(line_items);
    }

    

    return new NextResponse(null, { status: 200 })
}