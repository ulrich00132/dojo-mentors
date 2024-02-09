import prisma from "@/app/libs/prismadb";

interface IParams {
    bookingId: string; 
}

export async function getBookingSessionById(
    params: IParams
) {
    try {
        const { bookingId } = params

        const bookingSession = await prisma.bookingSession.findUnique({
            where: {
                id: bookingId,
            }
        });

        if (!bookingSession) {
            return null;
        };

        return {
            ...bookingSession,
            createdAt: bookingSession.createdAt.toISOString(),
            when: bookingSession.when.toISOString(),
            startTime: bookingSession.startTime.toISOString(),
            enTime: bookingSession.endTime.toISOString()
            
        } 

    } catch (error: any) {
        throw new Error(error)
    }
}