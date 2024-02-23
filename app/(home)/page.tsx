import getCurrentUser from "../actions/getCurrentUser";
import getProfiles, { IProfileParams } from "../actions/getProfiles";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import LandingPage from "../components/launch/LandingPage";

import ProfileCard from "../components/profiles/ProfileCard";

import { categories } from "../libs/data";


interface HomeProps {
  searchParams: IProfileParams
}

export const dynamic = 'force-dynamic'

const Home = async ({ searchParams }: HomeProps) => {
  
  const profiles = await getProfiles({params: searchParams});

  const currentUser = await getCurrentUser();
  const expertises = profiles.flatMap((profile) => profile.myExpertise);
  const uniqueExpertises = Array.from(new Set(expertises));
  
  // Filter profile based on the category from URL
  const filteredProfiles = profiles.filter((profile) => {
    const profileCategories = profile.myExpertise.flatMap((expertise) => 
      categories.filter((categoryData) =>
        categoryData.skills.some((skill) => skill.expertise === expertise)
      )
    );

    return profileCategories.some((profileCategory) => profileCategory.label === searchParams.category)
    
  })


  if (profiles.length === 0) {
    return (
      <EmptyState 
        showReset
      />
    )
  }


  return (
    <Container>
      {/* <div>
        {searchParams.category ? (
          <div
            className="
              pt-24
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              mx-0
              gap-8
          "
          
          >
            {filteredProfiles.map((profile) => {
              return (
                <ProfileCard 
                  key={profile.id}
                  data={profile}
                />
              )
            })}
          </div>
        ) : (
          <div
            className="
              pt-24
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              mx-0
              gap-8
            "
          >
            {profiles.map((profile) => {
              return (
                <ProfileCard 
                  key={profile.id}
                  data={profile}
                  profileCategories={[]}

                />
              )
            })}
          </div>
        )}
      </div> */}

      <LandingPage />

    </Container>
  )
}

export default Home;