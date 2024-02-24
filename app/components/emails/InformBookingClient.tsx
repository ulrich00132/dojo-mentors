import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
    Tailwind
  } from "@react-email/components";
  import * as React from "react";
  
  interface VercelInviteUserEmailProps {
    username?: string;
    userImage?: string;
    invitedByUsername?: string;
    invitedByEmail?: string;
    teamName?: string;
    teamImage?: string;
    inviteLink?: string;
    inviteFromIp?: string;
    inviteFromLocation?: string;
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  
  export const VercelInviteUserEmail = ({
    username,
    userImage,
    invitedByUsername,
    invitedByEmail,
    teamName,
    teamImage,
    inviteLink,
    inviteFromIp,
    inviteFromLocation,
  }: VercelInviteUserEmailProps) => {
    const previewText = `Rejoignez ${invitedByUsername} sur Dojo Mentors`;
  
    return (
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Tailwind>
          <Body className="bg-white my-auto mx-auto font-sans px-2">
            <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
              <Section className="mt-[32px]">
                <Img
                  src="https://www.dojomentors.com/_next/image?url=%2Fimages%2Fdojo-mentors-logo.png&w=128&q=75"
                  width={100}
                  height={100}
                  alt="Dojo mentor"
                  className="my-0 mx-auto"
                />
              </Section>
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Rejoinez <strong>{teamName}</strong> sur <strong>Dojo Mentors</strong>
              </Heading>
              <Text className="text-black text-[14px] leading-[24px]">
                👋 Hey {username},
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                <strong>{invitedByUsername}</strong> (
                <Link
                  href={`mailto:${invitedByEmail}`}
                  className="text-blue-600 no-underline"
                >
                  {invitedByEmail}
                </Link>
                ) vous invite à rejoindre la communauté <strong>Dojo Mentors</strong> pour devenir {" "}
                <strong>innarêtable</strong>.
              </Text>
              <Section>
                <Row>
                  <Column align="right">
                    <Img
                      className="rounded-full"
                      src={userImage}
                      width="64"
                      height="64"
                    />
                  </Column>
                  <Column align="center">
                    <Img
                      src={`${baseUrl}/static/vercel-arrow.png`}
                      width="12"
                      height="9"
                      alt="invited you to"
                    />
                  </Column>
                  <Column align="left">
                    <Img
                      className="rounded-full"
                      src="/images/dojo-mentors-logo.png"
                      width={80}
                      height={80}
                    />
                  </Column>
                </Row>
              </Section>
              <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                  className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                  href={inviteLink}
                >
                  Join the team
                </Button>
              </Section>
              
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                Cette invitation est adressée à {" "}
                <span className="text-black">{username}</span>.  Si vous n{"'"}espériez pas cette invitation, vous pouvez ignorer ce mail.
                Si vous vous désirez en savoir plus sur ce qu{"'"}il es est de la sécurité de vos données, il suffit de répondre à ce mail. 
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  VercelInviteUserEmail.PreviewProps = {
    username: "Ulrich",
    userImage: `${baseUrl}/static/vercel-user.png`,
    invitedByUsername: "Alan",
    invitedByEmail: "alan.turing@example.com",
    teamName: "Enigma",
    teamImage: `${process.env.NEXT_PUBLIC_APP_URL}/public/images/dojo-mentors-logo.png`,
    inviteLink: "https://dojomentors/signup?referral=yes&guest=email@mail.com&host=email@mail.com",
    inviteFromIp: "204.13.186.218",
    inviteFromLocation: "São Paulo, Brazil",
  } as VercelInviteUserEmailProps;
  
  export default VercelInviteUserEmail;
  