import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { VerificationEmail } from "@/template/verfication-email";
import ResetPasswordEmail from "@/template/password-reset-email";

export const sendPasswordResetEmail = async (
  name: string,
  email: string,
  token: string,
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gabayan170@gmail.com",
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const resetLink = `https://study-abroad-canada.vercel.app/auth/new-password?token=${token}`;

  const emailHtml = render(
    <ResetPasswordEmail name={name} resetLink={resetLink} />,
  );

  const options = {
    from: "gabayan170@gmail.com",
    to: email,
    subject: "Reset your password",
    html: emailHtml,
  };

  await transporter.sendMail(options);
};

export const sendVerificationEmail = async (
  name: string,
  senderEmail: string,
  email: string,
  token: string,
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gabayan170@gmail.com",
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const confirmLink = `https://study-abroad-canada.vercel.app/auth/new-verification?token=${token}`;

  const emailHtml = render(
    <VerificationEmail
      name={name}
      senderEmail={senderEmail}
      confirmLink={confirmLink}
    />,
  );

  const options = {
    from: "gabayan170@gmail.com",
    to: email,
    subject: "Confirm your email",
    html: emailHtml,
  };

  await transporter.sendMail(options);
};
