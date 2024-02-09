import getCurrentUser from "@/app/actions/getCurrentUser";
import getProfileName from "@/app/actions/getProfileName";

import EmptyState from "@/app/components/EmptyState";
import ProfileClient from "./ProfileClient";
import getBookingSessions from "@/app/actions/getBookingSessions";



interface IParams {
  mentorId?: string;
}



const MentorPage = async ({ params }: { params: IParams}) => {
  
  const profile = await getProfileName(params);
  const bookingSessions = await getBookingSessions(params)
  const currentUser = await getCurrentUser();
  

  if (!profile) {
    return (
      <EmptyState />
    )
  };

  
  
  return (

    <ProfileClient 
      profile={profile}
      bookingSessions={bookingSessions}
      currentUser={currentUser}
      />
     
  )
}

export default MentorPage