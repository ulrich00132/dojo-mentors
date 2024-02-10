
import prisma from '@/app/libs/prismadb';

// import { categories } from "@/app/libs/data";


export interface IProfileParams {
    mentorId?: string;
    category?: string;
}


export default async function getProfiles({
    params,
    
}: {
    params: IProfileParams;
    
}) {
    try {
        const { 
            mentorId,
            category,
        } = params;
        
        let query: any = {}


        if (mentorId) {
           query.userId = mentorId
        }

        // if (category) {
        //     query.category = category
        // }

        
        
        const profiles = await prisma.profile.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                mentor: true
            }
        });

        

        const safeProfile = profiles.map((profile) => ({
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

        return safeProfile;
    } catch (error: any) {
        throw new Error(error);
    }
}

