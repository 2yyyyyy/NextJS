"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/action/cookie";
import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";
import { getAuthOrRedirect } from "../queries/get-auth-or-redirect";
import { validateEmailVerificationCode } from "../utils/validate-email-verification-code";
const EmailVerificationScheme = z.object({
  code: z.string().length(6),
});

export const emailVerification = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect({
    checkEmailVerified: false,
    checkOrganization: false,
    checkActiveOrganization: false,
  });
  try {
    const { code } = EmailVerificationScheme.parse(
      Object.fromEntries(formData)
    );

    const validCode = await validateEmailVerificationCode(
      user.id,
      user.email,
      code
    );

    if (!validCode) {
      return toActionState("ERROR", "Invalid or expired code");
    }

    await prisma.session.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: true,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    const cookie = await cookies();

    cookie.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    return formErrorToActionState(error, formData);
  }

  await setCookieByKey("toast", "Email Verified");
  redirect(ticketsPath());
};
