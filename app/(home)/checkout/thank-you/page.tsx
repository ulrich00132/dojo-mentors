import Container from '@/app/components/Container'
import ThankYou from './ThankYou'
import getCurrentUser from '@/app/actions/getCurrentUser';


const ThankYouPage = async () => {

  const currentUser = await getCurrentUser();

  return (
    <Container>
      <ThankYou currentUser={currentUser} />
    </Container>
  )
}

export default ThankYouPage