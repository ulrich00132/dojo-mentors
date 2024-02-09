import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        guestEmail,
    } = body

    try {
        const host = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                referral: {
                    create: {
                        guestEmail,   
                    }
                }
            }
        })
        console.log(host)
        return NextResponse.json(host)

    } catch (error) {
        console.log("Error creating referral", error)
        return NextResponse.error()
    }

}