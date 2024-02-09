import prisma from "@/app/libs/prismadb";

interface IParams {
    profileId?: string;
    userId?: string;
    mentorId?: string;
}

export default async function getSubscriptions(
    params: IParams
) {
    try {
        const { profileId, userId, mentorId } = params;
        const query: any = {
            isActive: true,
        };

        if (profileId) {
            query.profileId = profileId;
        };

        if (userId) {
            query.userId = userId;
        };

        if (mentorId) {
            query.profile = {slug: mentorId};
        }

        const subscriptions = await prisma.subscription.findMany({
            where: query,
            include: {
                profile: {
                    include: {
                        mentor: true,
                    }
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const safeSubscriptions = subscriptions.map(
            (subscription) => ({
                ...subscription,
                createdAt: subscription.createdAt.toISOString(),
                updatedAt: subscription.updatedAt.toISOString(),
                profile: {
                    ...subscription.profile,
                    createdAt: subscription.profile.createdAt.toISOString(),
                    mentor: {
                        ...subscription.profile.mentor,
                        createdAt: subscription.profile.mentor.createdAt.toISOString(),
                        updatedAt: subscription.profile.mentor.updatedAt.toISOString(),
                        emailVerified:
                            subscription.profile.mentor.emailVerified?.toISOString() || null,
                    }
                },
                userId: subscription.userId
            })
        );

        return safeSubscriptions;
         

    } catch (error: any) {
        throw new Error(error);
    }
}