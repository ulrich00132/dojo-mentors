import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
// import getProfileById from "@/app/actions/getProfileById";

import Stripe from "stripe";

import { singleLevelNestedRoutes } from "@/app/libs/routes";

import { Resend } from "resend";
import VercelInviteUserEmail from "@/app/components/emails/InformBookingClient";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        profileId,
        when,
        startTime,
        endTime,
        totalPrice,
        status,
        duration
    } = body;

    if (!profileId || !when || !startTime || !endTime || !totalPrice ) {
        return NextResponse.error();
    }

    

    

    const profileAndBooking = await prisma.profile.update({
        where: {
            id: profileId
        },
        include: {
            mentor: true
        },
        data: {
            bookingSessions: {
                create: {
                    userId: currentUser.id,
                    when,
                    startTime,
                    endTime,
                    totalPrice,
                    status,
                    duration: parseInt(duration, 10)
                }
            }
        }
    })


    const bookingSessions = await prisma.bookingSession.findMany({
        where: {
            userId: currentUser.id,
            profileId: profileId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const currentBookingSession = bookingSessions[0]
    

    // Checkout
    const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

    
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: profileAndBooking.stripeSessionProductPriceId,
            quantity: duration as number,
          },
        ],
        metadata: {
            userId: currentUser.id,
            userFirstName: currentUser.firstName,
            userLastName: currentUser.lastName,
            email: currentUser.email,
            bookingSessionId: currentBookingSession.id,
            paymentMethodId: currentUser.paymentMethodId,
            stripeCustomerId: currentUser.stripeCustomerId,
        },
        payment_intent_data: {
          application_fee_amount: Math.round((totalPrice * 100) * 0.20),
          transfer_data: {
            destination: profileAndBooking.stripeAccountId,
          },
        },
        mode: 'payment',
        success_url: "http://localhost:3000/checkout/thank-you",
        cancel_url: "http://localhost:3000/checkout/failure",
      });

    //   Send Email to Mentee
    const resend = new Resend(process.env.RESEND_API_KEY);
    const mailToMentee = await resend.emails.send({
        from: "Dojo Mentor <onboarding@resend.dev>",
        to: currentUser.email,
        subject: "🎉 Votre réservation de Mentoring",
        react: VercelInviteUserEmail({ username: currentUser.firstName })
    });


    // Send Email to Mentor
    const mailToMentor = await resend.emails.send({
        from: "Dojo Mentor <onboarding@resend.dev>",
        to: profileAndBooking.mentor.email,
        subject: "🙌 Une nouvelle réservation",
        react: VercelInviteUserEmail({ username: profileAndBooking.mentor.firstName })
    });


    const responseData = {profileAndBooking, currentBookingSession, session}

    console.log(session)

    
    return NextResponse.json(responseData);
}