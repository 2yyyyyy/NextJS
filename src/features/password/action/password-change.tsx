"use server";
import { z } from "zod";
import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { verifyPasswordHash } from "@/features/password/utils/hash-and-verify";
import { inngest } from "@/lib/inngest";
const PasswordChangeScheme = z.object({
  password: z.string().min(1, { message: "Is required" }).max(191),
});

export const passwordChange = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect();
  try {
    const { password } = PasswordChangeScheme.parse(
      Object.fromEntries(formData)
    );

    const validPassword = await verifyPasswordHash(user.passwordHash, password);

    if (!validPassword) {
      return toActionState("ERROR", "Invalid password", formData);
    }

    await inngest.send({
      name: "app/password.password-reset",
      data: {
        userId: user.id,
      },
    });
  } catch (error) {
    return formErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "Check your email for a reset link");
};
