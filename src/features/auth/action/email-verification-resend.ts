"use server";
import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { sendEmailVerification } from "../emails/seed-email-verificatiom";
import { getAuthOrRedirect } from "../queries/get-auth-or-redirect";
import { canResendVerificationEmail } from "../utils/can-resend-verification-email";
import { generateEmailVerificationCode } from "../utils/generate-email-verification-code";

export const emailVerificationResend = async (_actionState: ActionState) => {
  const { user } = await getAuthOrRedirect({
    checkEmailVerified: false,
    checkOrganization: false,
    checkActiveOrganization: false,
  });
  try {
    const canResend = await canResendVerificationEmail(user.id);
    if (!canResend) {
      return toActionState(
        "ERROR",
        "You can only resend the verification email once every minute"
      );
    }

    const verificationCode = await generateEmailVerificationCode(
      user.id,
      user.email
    );

    const result = await sendEmailVerification(
      user.username,
      user.email,
      verificationCode
    );

    if (result.error) {
      return toActionState("ERROR", "Failed to send verification email");
    }
  } catch (error) {
    return formErrorToActionState(error);
  }

  return toActionState("SUCCESS", "Verification email resent");
};
