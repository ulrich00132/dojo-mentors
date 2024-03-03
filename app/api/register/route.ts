import bcrypt from 'bcrypt';
import prisma from "@/app/libs/prismadb";
import { NextResponse } from 'next/server';

import { Resend } from 'resend';
import GithubAccessTokenEmail from '@/app/components/emails/Welcome';


export async function POST(
    request: Request
){
    const body = await request.json();
    const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

    const {
        email,
        firstName,
        lastName,
        password
    } = body

    const hashedPassword = await bcrypt.hash(password, 12);


    const user = await prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            hashedPassword
        }
    });
    

    // Create Stripe Customer ID
    const userFirstName = user.firstName;
    const userLastName = user.lastName;
    const userFullName = `${userFirstName} ${userLastName}`;

    const customer = await stripe.customers.create({
        name: userFullName,
        email: user.email,
        metadata: {
            userId: user.id
        },
        
    
    });

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            stripeCustomerId: customer.id
        }
    });
    
    // Send Email to User
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
        from: "welcome@dojomentors.com",
        to: user.email,
        subject: "Bienvenue sur Dojo Mentors",
        react: GithubAccessTokenEmail({ username: user.firstName })
    });


    return NextResponse.json(user);
};

