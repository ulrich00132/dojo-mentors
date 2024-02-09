import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    userId?: string;
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error();
    };

    const { userId } = params;

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    return NextResponse.json(user);
}