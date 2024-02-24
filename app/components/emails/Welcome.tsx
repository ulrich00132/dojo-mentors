
import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
  } from "@react-email/components";
  import * as React from "react";

  import { IoIosCheckboxOutline, IoMdSquareOutline } from "react-icons/io";
  import { GoDotFill } from "react-icons/go";
  import LogoSvg from "../svgIcons/Logo";
  import CheckedIcon from "../svgIcons/Checked";
  
  interface GithubAccessTokenEmailProps {
    username?: string;
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
    : "";
  
  export const GithubAccessTokenEmail = ({
    username,
  }: GithubAccessTokenEmailProps) => (
    <Html>
      <Head />
      <Preview>
        Tu es sur le point de créer une meilleure version de toi et du monde.
      </Preview>
      <Tailwind>
      <Body style={main} className="bg-white">
        <Container style={container}>
          <Img
            src={`https://www.dojomentors.com/_next/image?url=%2Fimages%2Fdojo-mentors-logo.png&w=128&q=75`}
            width="100"
            height="100"
            alt="Dojo Mentor"
          />
  
          <Text style={title}>
            <span className="font-semibold">Bienvenue dans la famille Dojo Mentors, </span><strong className="text-[#FC75FF]">{username}!</strong>
          </Text>
  
          <Section style={section}>
            <Text style={text}>
              Hey <strong>{username}</strong>!
            </Text>

            <Text className="text-left text-md">
              Voici un guide facile pour t{"'"}aider à commencer 👇.
            </Text>
            <Text>
              <div className="flex flex-row items-center text-black gap-2">
                <div className="p-1 text-white">
                ✅
                </div>
                <div className="text-left">  Créer ton compte</div>
              </div>
            </Text>
            <Text>
              <div className="flex flex-row items-center text-black gap-2">
                <div className="p-1 text-[#FC75FF] text-xl border-2">
                  ▢
                </div>
                <div className="text-left">Commencer à acquérir des connaissances et en partager.</div>
              </div>
            </Text>

            <Text>
              <div className="flex flex-col gap-4 text-left leading-normal">
                <div className="flex flex-row gap-2 ml-8">
                  <div className="text-[#FC75FF] text-6xl">⋅</div>
                  <span><strong>Activer ton compte</strong> pour profiter de toutes les fonctionnalités.</span>
                </div>
                <div className="flex flex-row gap-2 ml-8">
                  <div className="text-[#FC75FF] text-6xl">⋅</div>
                  <span><strong>Trouver un mentor</strong> pour acquérir de nouvelles compétences ou renforcer les existantes.</span>
                </div>
                <div className="flex flex-row gap-2 ml-8">
                  <div className="text-[#FC75FF] text-6xl">⋅</div>
                  <span><strong>Créer ton dojo</strong>{" pour par partager tes compétences avec tes élèves (mentorés)"} </span>
                </div>

              </div>

            </Text>

            <Text style={text}>
              Clique sur ce lien (<Link>Dojo Mentors</Link>) pour activer ton compte Dojo Mentors.
            </Text>
          
            <Button className="bg-black p-4 text-white">Activer mon compte</Button>
          
          </Section>
          
  
          <Text style={footer}>
            Dojo Mentors, the place where you become unstoppable!
          </Text>
        </Container>
      </Body>
      </Tailwind>
    </Html>
  );
  
  GithubAccessTokenEmail.PreviewProps = {
    username: "alanturing",
  } as GithubAccessTokenEmailProps;
  
  export default GithubAccessTokenEmail;
  
  const main = {
    backgroundColor: "#ffffff",
    color: "#24292e",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
  };
  
  const container = {
    maxWidth: "480px",
    margin: "0 auto",
    padding: "20px 0 48px",
  };
  
  const title = {
    fontSize: "24px",
    lineHeight: 1.25,
  };
  
  const section = {
    padding: "24px",
    border: "solid 1px #dedede",
    borderRadius: "5px",
    textAlign: "center" as const,
  };
  
  const text = {
    margin: "0 0 10px 0",
    textAlign: "left" as const,
  };
  
  const button = {
    fontSize: "14px",
    backgroundColor: "#28a745",
    color: "#fff",
    lineHeight: 1.5,
    borderRadius: "0.5em",
    padding: "12px 24px",
  };
  
  const links = {
    textAlign: "center" as const,
  };
  
  const link = {
    color: "#0366d6",
    fontSize: "12px",
  };
  
  const footer = {
    color: "#6a737d",
    fontSize: "12px",
    textAlign: "center" as const,
    marginTop: "60px",
  };
  