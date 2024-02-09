import prisma from "@/app/libs/prismadb";

interface IParams {
    profileId?: string;
    userId?: string;
    mentorId?: string;
}

export default async function getBookingSessions(
    params: IParams
) {
    try {

        const { profileId, userId, mentorId } = params;
        const query: any = {
            isComplete: true,
        };

        if (profileId) {
            query.profileId = profileId;
        };

        if (userId) {
            query.userId = userId;
        };

        if (mentorId) {
            query.profile = { slug: mentorId};
        };

        const bookingSessions = await prisma.bookingSession.findMany({
            where: query,
            include: {
                profile: {
                    include: {
                        mentor: true,
                    },
                },
                
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const safeBookingSessions = bookingSessions.map(
            (bookingSession) => ({
                ...bookingSession,
                createdAt: bookingSession.createdAt.toISOString(),
                when: bookingSession.when.toISOString(),
                startTime: bookingSession.startTime.toISOString(),
                endTime: bookingSession.endTime.toISOString(),
                status: bookingSession.status,
                profile: {
                    ...bookingSession.profile,
                    createdAt: bookingSession.profile.createdAt.toISOString(),
                    mentor: {
                        ...bookingSession.profile.mentor,
                        createdAt: bookingSession.profile.mentor.createdAt.toISOString(),
                        updatedAt: bookingSession.profile.mentor.updatedAt.toISOString(),
                        emailVerified: 
                        bookingSession.profile.mentor.emailVerified?.toISOString() || null,
                    }
                    
                },
                userId: bookingSession.userId
            })
        );

        return safeBookingSessions;
    } catch (error: any) {
        throw new Error(error);
    }
}
