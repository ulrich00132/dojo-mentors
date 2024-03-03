import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Stripe from "stripe";

import { singleLevelNestedRoutes } from "@/app/libs/routes";

import { Resend } from "resend";
import VercelInviteUserEmail from "@/app/components/emails/InformBookingClient";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();
    
    const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        plan,
        totalPrice,
        chat,
        responseDelay,
        call,
        support,
        profileId,
        stripeProductId,
        stripePriceId,
    } = body;

    if (!plan || !totalPrice) {
        return NextResponse.error();
    };

    

    const profileAndSubscription = await prisma.profile.update({
        where: {
            id: profileId
        },
        include: {
            mentor: true,
        },
        data: {
            subscriptions: {
                create: {
                    userId: currentUser.id,
                    plan: plan,
                    chat: chat,
                    responseDelay: responseDelay,
                    call: call,
                    support: support,
                    totalPrice: totalPrice,
                    stripePriceId: stripePriceId,
                    stripeProductId: stripeProductId,
                    isActive: false,
                    stripeSubscriptionId: ""
                }
            }
        }
    });

    const subscription = await prisma.subscription.findMany({
        where: {
            userId: currentUser.id,
            profileId: profileId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const currentSubscription = subscription[0];

    const stripeSubscription = await stripe.subscriptions.create({
        customer: currentUser.stripeCustomerId,
        items: [
          {
            price: stripePriceId,
          },
        ],
        metadata: {
            subscriptionId: currentSubscription.id, 
        },
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
        transfer_data: {
          destination: profileAndSubscription.stripeAccountId,
        },
    });

    // CREATE PAYMENT INTENT
    const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(totalPrice, 10) * 100,
        currency: "eur",
        automatic_payment_methods: {
            enabled: true,
        },
        transfer_data: {
            destination: profileAndSubscription.stripeAccountId,
        },
        application_fee_amount: Math.round((totalPrice * 100) * 0.20),
        metadata: {
            subscriptionId: currentSubscription.id,
            stripeSubscriptionId: stripeSubscription.id
        }
    });
        

    const updateSubscription = await prisma.subscription.update({
        where: {
            id: currentSubscription.id,
        },
        data: {
            stripeSubscriptionId: stripeSubscription.id
        }
    });

    
    const responseData = {
        profileAndSubscription, 
        currentSubscription, 
        paymentIntent, 
        stripeSubscription,
        subscriptionId: currentSubscription.id
    };

    //   Send Email to Mentee
    const resend = new Resend(process.env.RESEND_API_KEY);
    const mailToMentee = await resend.emails.send({
        from: "Dojo Mentor <noreply@dojomentors.com>",
        to: currentUser.email,
        subject: "🎉 Votre abonnement de Mentoring",
        react: VercelInviteUserEmail({ username: currentUser.firstName })
    });


    // Send Email to Mentor
    const mailToMentor = await resend.emails.send({
        from: "Dojo Mentor <noreply@dojomentors.com>",
        to: profileAndSubscription.mentor.email,
        subject: "🙌 Une nouveau mentoré",
        react: VercelInviteUserEmail({ username: profileAndSubscription.mentor.firstName }),
    });

    // console.log(responseData, "Client secret: ", paymentIntent.client_secret)
    // console.log(stripeSubscription)

    return NextResponse.json(responseData);


}