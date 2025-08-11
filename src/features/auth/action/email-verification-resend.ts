"use server";
import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { sendEmailVerification } from "../emails/seed-email-verificatiom";
import { getAuthOrRedirect } from "../queries/get-auth-or-redirect";
import { generateEmailVerificationCode } from "../utils/generate-email-verification-code";

export const emailVerificationResend = async (_actionState: ActionState) => {
  const { user } = await getAuthOrRedirect({
    checkEmailVerified: false,
    checkOrganization: false,
    checkActiveOrganization: false,
  });
  try {
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
