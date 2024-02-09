import prisma from "@/app/libs/prismadb";



export default async function getCurrentProfile() {
    
    const currentProfile = await prisma.profile.findUnique({
        where: {
            slug: "dylan-medenou"
        }
    })

    return currentProfile;
}