import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import crypto from "crypto";


export async function POST(
    request: Request
 ) {
    const { token } = await request.json();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await prisma.user.findFirst({
        where: {
            resetToken: hashedToken,
            resetTokenExpiry: { gte: new Date(Date.now()) }
        },
    });

    if (!user) {
        return new NextResponse("Lien invalide ou expiré", { status: 404 })
    };

    // return new NextResponse(JSON.stringify(user, ), { status: 200 });

    // console.log(user)
    return NextResponse.json(user);
    
 }