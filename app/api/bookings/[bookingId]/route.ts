import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";

import prisma from "@/app/libs/prismadb";

interface IParams {
    bookingId?: string;
};

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    const firstName = currentUser?.firstName;
    const lastName = currentUser?.lastName;
    const formattedFirstName= firstName?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const formattedLastName = lastName?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const slug = `${formattedFirstName}-${formattedLastName}`;


    if (!currentUser) {
        NextResponse.error();
    }

    const { bookingId } = params;

    if (!bookingId || typeof bookingId !== "string") {
        throw new Error("Réservation invalide")
    }

    const booking = await prisma.bookingSession.deleteMany({
        where: {
            id: bookingId,
            OR: [
                { userId: currentUser?.id },
                { profile: { slug: slug } }
            ]
        }
    });

    return NextResponse.json(booking);
}

