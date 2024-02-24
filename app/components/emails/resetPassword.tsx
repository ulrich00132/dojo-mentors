import {
    Body,
    Container,
    Column,
    Head,
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
  
  interface ResetPasswordEmailProps {
    username?: string;
    updatedDate?: Date;
    resetUrl?: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const ResetPasswordEmail = ({
    username,
    updatedDate,
    resetUrl
  }: ResetPasswordEmailProps) => {
    const formattedDate = new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "medium",
    }).format(updatedDate);
  
    return (
      <Html>
        <Head />
        <Preview>Ta demande de changement de mot de passe</Preview>
        <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Section style={logo}>
              <Img width={114} src={"https://www.dojomentors.com/_next/image?url=%2Fimages%2Fdojo-mentors-logo.png&w=128&q=75"} />
            </Section>
            <Section style={sectionsBorders}>
              <Row>
                <Column style={sectionBorder} />
                <Column style={sectionCenter} />
                <Column style={sectionBorder} />
              </Row>
            </Section>
            <Section style={content}>
              <Text style={paragraph}>👋 Hey {username},</Text>
              <Text style={paragraph}>
                Tu as fait une demande de mise à jour de ton mot de passe ce {" "}
                {formattedDate}.
              </Text>
              <Text style={paragraph}>
                Voici un lien unique pour {" "}
                <Link href={resetUrl} style={link}>
                  réinitaliser ton mot de passe
                </Link>{" "}
                sans plus tarder.
              </Text>
              <Text style={paragraph}>
                Rappelle toi d{"'"}utiliser un mot de passe unique et complex à déchiffrer. Voire impossible à déchiffrer 🙂.
              </Text>
              <Text style={paragraph}>
                Tu as des questions ?{" "}
                <Link href="#" style={link} target="_blank">
                  <a href="mailto:hello@dojomentors.com" className="text-[#FC75FF]">Dojo Mentors Support</a>
                </Link>
              </Text>
              <Text style={paragraph}>
                Thanks,
                <br />
                Dojo Mentors
              </Text>
            </Section>
          </Container>
  
          <Section style={footer}>
            <Row>
              <Column align="right" style={{ width: "50%", paddingRight: "8px" }}>
                <Img src={`${baseUrl}/static/twitch-icon-twitter.png`} />
              </Column>
              <Column align="left" style={{ width: "50%", paddingLeft: "8px" }}>
                <Img src={`${baseUrl}/static/twitch-icon-facebook.png`} />
              </Column>
            </Row>
            <Row>
              <Text style={{ textAlign: "center", color: "#706a7b" }}>
                © 2024 Dojo Mentors, All Rights Reserved <br />
                Dojo Mentors, the place where you become unstoppable!
              </Text>
            </Row>
          </Section>
        </Body>
        </Tailwind>
      </Html>
    );
  };
  
  ResetPasswordEmail.PreviewProps = {
    username: "alanturing",
    updatedDate: new Date("June 23, 2022 4:06:00 pm UTC"),
  } as ResetPasswordEmailProps;
  
  export default ResetPasswordEmail;
  
  const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";
  
  const main = {
    backgroundColor: "#efeef1",
    fontFamily,
  };
  
  const paragraph = {
    lineHeight: 1.5,
    fontSize: 14,
  };
  
  const container = {
    maxWidth: "580px",
    margin: "30px auto",
    backgroundColor: "#ffffff",
  };
  
  const footer = {
    maxWidth: "580px",
    margin: "0 auto",
  };
  
  const content = {
    padding: "5px 20px 10px 20px",
  };
  
  const logo = {
    display: "flex",
    justifyContent: "center",
    alingItems: "center",
    padding: 30,
  };
  
  const sectionsBorders = {
    width: "100%",
    display: "flex",
  };
  
  const sectionBorder = {
    borderBottom: "1px solid rgb(238,238,238)",
    width: "249px",
  };
  
  const sectionCenter = {
    borderBottom: "1px solid rgb(145,71,255)",
    width: "102px",
  };
  
  const link = {
    textDecoration: "underline",
    color: "#FC75FF"
  };
  