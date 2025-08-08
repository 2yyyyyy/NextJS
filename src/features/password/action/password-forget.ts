"use server";
import { z } from "zod";
import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
const PasswordForgetScheme = z.object({
  email: z.string().min(1, { message: "Is required" }).max(191).email(),
});

export const passwordForget = async (
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const { email } = PasswordForgetScheme.parse(Object.fromEntries(formData));

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return toActionState("ERROR", "Incorrect email", formData);
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
