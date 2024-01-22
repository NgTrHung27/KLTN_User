import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  name: string;
  image?: string;
  confirmLink: string;
  senderEmail: string;
}

export const VerificationEmail: React.FC<Readonly<VerificationEmailProps>> = ({
  name,
  image,
  confirmLink,
  senderEmail,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Hello, {name}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={"logo-red.png"}
                width="40"
                height="37"
                alt="Logo"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Join <strong>🏫 Canadian Student Management Center</strong> today!
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {name},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>🏫 Canadian Student Management Center</strong> (
              <Link
                href={`mailto:${senderEmail}`}
                className="text-blue-600 no-underline"
              >
                {senderEmail}
              </Link>
              ) has sent you an verification mail.
            </Text>
            <Section>
              <Row>
                <Column align="right">
                  <Img
                    className="rounded-full"
                    src={image}
                    width="64"
                    height="64"
                  />
                </Column>
              </Row>
            </Section>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={confirmLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link href={confirmLink} className="text-blue-600 no-underline">
                {confirmLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This verification mail was intended for{" "}
              <span className="text-black">{name}</span>. This invite was sent
              from{" "}
              <span className="text-black">
                🏫 Canadian Student Management Center
              </span>
              . If you were not expecting this verification, you can ignore this
              email. If you are concerned about your account&apos;s safety,
              please reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
