import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getProfileName from "@/app/actions/getProfileName";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    mentorId?: string;
}


export async function POST(
    request: Request,
    { params }: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    const { mentorId } = params

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        bodyMessage,
        conversationId
    } = body

    const conversation = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            conversations: {
                create: {
                    messages: bodyMessage
                }
            }
        }
    })
    
}