import { NextResponse } from "next/server";

import prisma from  "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

import { singleLevelNestedRoutes } from "@/app/libs/routes";

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
        // isMentor,
        hasMentorshipPlan,
        avatar,
        bio,
        profileTitle,
        location,
        locationFlag,
        company,
        position,

        // isPremium,
        menteeCount,

        linkedIn,
        twitter,
        facebook,
        instagram,
        website,

        sucessStory,

        myExpertise,


        sessionPrice,
        minTimeBlock,

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

        // stripeAccountId,

        slug,
        } = body

        // CREATE STRIPE SELLER ACCOUNT

        const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

        try {
            // const account = await stripe.accounts.create({
            //   type: 'express',
            //   country: location.value,
            //   email: currentUser.email,
            //   capabilities: {
            //     card_payments: {
            //       requested: true,
            //     },
            //     transfers: {
            //       requested: true,
            //     },
            //   },
            //   settings: {
            //     payouts: {
            //       schedule: {
            //         interval: 'manual',
            //       }
            //     }
            //   }

            // });

            

            // Create Stripe Product
            const stripeProduct = await stripe.products.create({
              name: 'Dojo Mentor Session',
            });

            // Create Stripe Product price
            const stripeProductPrice = await stripe.prices.create({
              product: stripeProduct.id,
              unit_amount: parseInt(sessionPrice, 10) * 100,
              currency: 'eur',
            });

            // CREATE STRIPE SUBSCRIPTION PLAN
            
             // Growth Plan
             const productGrowth = await stripe.products.create({
              name: 'Growth',
            });

            const growthPlanPrice = await stripe.prices.create({
              product: productGrowth.id,
              unit_amount: parseInt(growthPrice, 10) * 100,
              currency: 'eur',
              recurring: {
                interval: 'month',
              },
            });

            // Scale Plan
            const productScale = await stripe.products.create({
              name: 'Growth',
            });

            const scalePlanPrice = await stripe.prices.create({
              product: productScale.id,
              unit_amount: parseInt(scalePrice, 10) * 100,
              currency: 'eur',
              recurring: {
                interval: 'month',
              },
            });

            // Advanced Plan
            const productAdvanced = await stripe.products.create({
              name: 'Growth',
            });

            const advancedPlanPrice = await stripe.prices.create({
              product: productAdvanced.id,
              unit_amount: parseInt(advancedPrice, 10) * 100,
              currency: 'eur',
              recurring: {
                interval: 'month',
              },
            });
            
            const profile = await prisma.profile.create({
                data: {
                    // isMentor,
                    hasMentorshipPlan,
                    avatar,
                    bio,
                    profileTitle,
                    locationValue: location.value,
                    locationFlag: location.flag,
                    company,
                    position,
    
                    // isPremium,
                    menteeCount,
    
                    linkedIn,
                    twitter,
                    facebook,
                    instagram,
                    website,
    
                    sucessStory,
                    
                    myExpertise,
    
                    sessionPrice: parseInt(sessionPrice, 10),
                    minTimeBlock: parseInt(minTimeBlock, 10),
    
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
                    
                    mentorId: currentUser.id,
    
                    // slug: `${currentUser.firstName}-${currentUser.lastName}`.toLowerCase()
                    slug: `${currentUser.firstName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}-${currentUser.lastName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`.toLowerCase(),

                    stripeAccountId: "myStripeAccountId",
                    stripeSessionProductId: stripeProduct.id,
                    stripeSessionProductPriceId: stripeProductPrice.id,
                    
                    stripeProductGrowthId: productGrowth.id,
                    stripePriceGrowthId: growthPlanPrice.id,
                    stripeProductScaleId: productScale.id,
                    stripePriceScaleId: scalePlanPrice.id,
                    stripeProductAdvancedId: productAdvanced.id,
                    stripePriceAdvancedId: advancedPlanPrice.id,
    
                }
            });

            const updatedCurrentUser = await prisma.user.update({
              where: {
                id: currentUser.id
              },
              data: {
                isMentor: true,
              }
            })

            return NextResponse.json(profile);

        } catch (error) {
            
            return NextResponse.error();
        }


        
    };