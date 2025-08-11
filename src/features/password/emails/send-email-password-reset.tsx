import EmailPasswordReset from "@/emails/password/email-password-reset";
import { resend } from "@/lib/resend";

export const sendEmailPasswordReset = async (
  username: string,
  email: string,
  passwordResetTLink: string
) => {
  return await resend.emails.send({
    from: "no-reply@email.pkl12y.xyz",
    to: email,
    subject: "Password Reset from TicketBounty",
    react: <EmailPasswordReset toName={username} url={passwordResetTLink} />,
  });
};
