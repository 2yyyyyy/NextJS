"use server";
import EmailVerification from "@/emails/auth/email-verification";
import { resend } from "@/lib/resend";

export const sendEmailVerification = async (
  username: string,
  email: string,
  code: string
) => {
  return await resend.emails.send({
    from: "no-reply@email.pkl12y.xyz",
    to: email,
    subject: "Email Verification from TicketBounty",
    react: <EmailVerification toName={username} code={code} />,
  });
};
