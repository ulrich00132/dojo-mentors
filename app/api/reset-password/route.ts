import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import { resend } from "@/app/libs/resend";
import bcrypt from 'bcrypt';

import { routes } from "@/app/libs/routes";
import ConfirmNewPasswordEmail from "@/app/components/emails/UpdatedPassword";


export async function POST(
    request: Request
) {
    const body = await request.json();
    
    const {
        email,
        password,
    } = body

    const hashedPassword = await bcrypt.hash(password, 12);


    const currentUser = await prisma.user.update({
        where: {
            email: email,
        },
        data: {
            hashedPassword: hashedPassword,
            resetToken: undefined,
            resetTokenExpiry: undefined,
        }
    });

    // Send Email to User
    const sendEmail = await resend.emails.create({
        from: "noreply@dojomentors.com",
        to: currentUser.email,
        subject: "Mise à jour de votre mot de passe",
        react: ConfirmNewPasswordEmail({ username: currentUser.firstName})
    })

    return NextResponse.json(currentUser);


}