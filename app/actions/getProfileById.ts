import prisma from '@/app/libs/prismadb';

interface IParams {
    mentorId?: string;
}

export default async function getProfileById(
    params: IParams

) {
    try {
        const { mentorId } = params;

        const profile = await prisma.profile.findUnique({
            where: {
                id: mentorId,
            },
            include: {
                mentor: true,
            },
        });
        
        if (!profile) {
            return null;
        }
    
        return {
            ...profile,
            createdAt: profile?.createdAt.toISOString(),
            updatedAt: profile.updatedAt.toISOString(),
            mentor: {
                ...profile.mentor,
                createdAt: profile.mentor.createdAt.toISOString(),
                updatedAt: profile.mentor.updatedAt.toISOString(),
                emailVerified:
                profile.mentor.emailVerified?.toISOString() || null,
            }
            
        };
    } catch (error: any) {
        throw new Error(error);
    }

}