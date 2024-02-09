import MentorProfile from "@/app/components/account/MentorProfile";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getProfileName from "@/app/actions/getProfileName";
import getAllProfiles from "@/app/actions/getAllProfiles";

import EmptyState from "@/app/components/EmptyState";

interface IParams {
    mentorId?: string
}


const Mentorship = async ({ params}: { params: IParams } ) => {

    try {
        const currentUser = await getCurrentUser();
        const allProfiles = await getAllProfiles();

        const firstName = currentUser?.firstName;
        const lastName = currentUser?.lastName;
        const formattedFirstName= firstName?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const formattedLastName = lastName?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const slug = `${formattedFirstName}-${formattedLastName}`

        const profile = await getProfileName({
            mentorId: slug
        });
    
        if (!profile) {
            return (
                <EmptyState 
                    title="Looks like you're not a Dojo Mentor yet!"
                    subtitle="It's never too late to share your knowleadge."
                />
            )
        }

        return (
            <MentorProfile 
                profile={profile}
                currentUser={currentUser}
                
            />
        )
    } catch (error) {
        return (
        <div>
            <EmptyState 
                title="Looks like you're not a Dojo Mentor yet!"
                subtitle="It's never too late to share your knowleadge."
            />

        </div>
        )
    }
    
}

export default Mentorship