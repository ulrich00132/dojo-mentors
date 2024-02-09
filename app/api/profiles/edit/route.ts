import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getProfileName from "@/app/actions/getProfileName";

import stripe from 'stripe';

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        id,
        hasMentorshipPlan,
        avatar,
        bio,
        profileTitle,
        company,
        location,
        position,
        menteeCount,
        linkedIn,
        twitter,
        facebook,
        instagram,
        website,
        sucessStory,
        myExpertise,
        sessionPrice,
        growthPrice,
        scalePrice,
        advancedPrice,
        callPerMonthGrowth,
        callPerMonthScale,
        callPerMonthAdvanced,
        chatPerMonthGrowth,
        chatPerMonthScale,
        chatPerMonthAdvanced,
        responseDelayGrowth,
        responseDelayScale,
        responseDelayAdvanced,
        supportGrowth,
        supportScale,
        supportAdvanced,
    } = body

    
    const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

    

    

    try {
        const editedProfile = await prisma.profile.update({
            where: {
                id: id
            },
            data: {
                hasMentorshipPlan,
                avatar,
                bio,
                profileTitle,
                locationValue: location.value,
                locationFlag: location.flag,
                company,
                position,
                menteeCount,
                linkedIn,
                twitter,
                facebook,
                instagram,
                website,
                sucessStory,
                myExpertise,
                sessionPrice: parseInt(sessionPrice, 10),
                growthPrice: parseInt(growthPrice, 10),
                scalePrice: parseInt(scalePrice, 10),
                advancedPrice: parseInt(advancedPrice, 10),
                callPerMonthGrowth,
                callPerMonthScale,
                callPerMonthAdvanced,
                chatPerMonthGrowth: chatPerMonthGrowth.label,
                chatPerMonthScale: chatPerMonthScale.label,
                chatPerMonthAdvanced: chatPerMonthAdvanced.label,
                responseDelayGrowth: responseDelayGrowth.label,
                responseDelayScale: responseDelayScale.label,
                responseDelayAdvanced: responseDelayAdvanced.label,
                supportGrowth,
                supportScale,
                supportAdvanced,
    
            }
        });
        
        // DISABLE OLD PRICES
        // Session price
        await stripe.prices.update(
            editedProfile.stripeSessionProductPriceId,
            {
                active: false,
            }
        );

        // Growth plan
        await stripe.prices.update(
            editedProfile.stripePriceGrowthId,
            {
                active: false,
            }
        );

        // Scale plan
        await stripe.prices.update(
            editedProfile.stripePriceScaleId,
            {
                active: false,
            }
        );

        // Advanced plan
        await stripe.prices.update(
            editedProfile.stripePriceAdvancedId,
            {
                active: false,
            }
        );


        // CREATE NEW PRICES
        // Create Stripe Product price
        const stripeProductPrice = await stripe.prices.create({
            product: editedProfile.stripeSessionProductId,
            unit_amount: parseInt(sessionPrice, 10) * 100,
            currency: 'eur',
          });

        // Growth plan
        const growthPlanPrice = await stripe.prices.create({
            product: editedProfile.stripeProductGrowthId,
            unit_amount: parseInt(growthPrice, 10) * 100,
            currency: 'eur',
            recurring: {
              interval: 'month',
            },
          });

        // Scale plan
        const scalePlanPrice = await stripe.prices.create({
            product: editedProfile.stripeProductScaleId,
            unit_amount: parseInt(scalePrice, 10) * 100,
            currency: 'eur',
            recurring: {
              interval: 'month',
            },
          });

        // Advanced plan
        const advancedPlanPrice = await stripe.prices.create({
            product: editedProfile.stripeProductAdvancedId,
            unit_amount: parseInt(advancedPrice, 10) * 100,
            currency: 'eur',
            recurring: {
              interval: 'month',
            },
          });


        //   UPDATE PROFILE
        const updatedProfile = await prisma.profile.update({
            where: {
                id: id
            },
            data: {
                stripeSessionProductPriceId: stripeProductPrice.id,
                stripePriceGrowthId: growthPlanPrice.id,
                stripePriceScaleId: scalePlanPrice.id,
                stripePriceAdvancedId: advancedPlanPrice.id,
            }
        })

        return NextResponse.json(updatedProfile);

    } catch (error) {
        console.log("Error Updating Stripe Account ", error);
        return NextResponse.error();
    };

};