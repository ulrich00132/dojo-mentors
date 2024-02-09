import prisma from "@/app/libs/prismadb";

export default async function getAllProfiles() {
    
    try {
        const allProfiles = await prisma.profile.findMany({
            orderBy: {
                createdAt: 'asc'
            },
            include: {
                mentor: true
            }
        });
    
        const safeAllProfiles = allProfiles.map((profile) => ({
            ...profile,
            createdAt: profile.createdAt.toISOString(),
            updatedAt: profile.updatedAt.toISOString(),
            mentor: {
                ...profile.mentor,
                createdAt: profile.mentor.createdAt.toISOString(),
                updatedAt: profile.mentor.updatedAt.toISOString(),
                emailVerified:
                    profile.mentor.emailVerified?.toISOString(),
            }
            
        }));
    
        return safeAllProfiles;

    } catch (error: any) {
        throw new Error(error);
    }
}