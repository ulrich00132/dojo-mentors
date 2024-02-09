import getCurrentUser from "@/app/actions/getCurrentUser"
import Container from "@/app/components/Container"
import ReferralSuccess from "./ReferralSuccess"

const ReferralPage = async () => {
    
    const currentUser = await getCurrentUser()
  
    return (
    <Container>
        <ReferralSuccess currentUser={currentUser} />
    </Container>
  )
}

export default ReferralPage