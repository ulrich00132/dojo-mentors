import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getProfileName from "@/app/actions/getProfileName";

import { singleLevelNestedRoutes } from "@/app/libs/routes";

import stripe from 'stripe';

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    const firstName = currentUser?.firstName;
    const lastName = currentUser?.lastName;
    const formattedFirstName= firstName?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const formattedLastName = lastName?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const slug = `${formattedFirstName}-${formattedLastName}`;

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        id,
        
    } = body;

    const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

     
    const editedProfile = await prisma.profile.findUnique({
        where: {
            id: id
        },
       
    });

    // CREATE STRIPE ACCOUNT LINK
    const stripeAccountLink = await stripe.accountLinks.create({
        account: editedProfile?.stripeAccountId,
        refresh_url: 
          process.env.NEXT_PUBLIC_APP_URL + singleLevelNestedRoutes.account.payments,
        return_url: 
          process.env.NEXT_PUBLIC_APP_URL + singleLevelNestedRoutes.account.payments,
        type: 'account_onboarding',
      });

      if (stripeAccountLink) {
        return {
          url: stripeAccountLink.url
        };
      }


    return NextResponse.json(stripeAccountLink);
};