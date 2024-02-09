import { BookingSession, Profile, User, Subscription } from "@prisma/client";

export type SafeProfile = Omit<
    Profile,
    "createdAt" | "updatedAt"
> & {
    createdAt: string | Date;
    updatedAt: string | Date;
    mentor: SafeUser;
}

export type SafeAllProfiles = Omit<
    Profile,
    "createdAt" | "updatedAt"
> & {
    createdAt: string | Date;
    updatedAt: string | Date;
    mentor: SafeUser;
}



export type SafeBookingSessions = Omit<
    BookingSession,
    "createdAt" | "when" | "startTime" | "endTime"
> & {
    createdAt: string;
    when: string | Date;
    startTime: string | Date;
    endTime: string | Date;
    profile: SafeProfile;
}

export type SafeSubscriptions = Omit<
    Subscription,
    "createdAt" | "updatedAt"
> & {
    createdAt: string;
    updatedAt: string;
    profile: SafeProfile;
}


export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string | Date;
    updatedAt: string;
    emailVerified: string | null | undefined;
};