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
import { verifyPasswordHash } from "@/features/password/utils/hash-and-verify";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";
const SignInScheme = z.object({
  email: z.string().min(1, { message: "Is required" }).max(191).email(),
  password: z.string().min(6).max(191),
});

export const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = SignInScheme.parse(
      Object.fromEntries(formData)
    );

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // if (!user) {
    //   return toActionState("ERROR", "Incorrect email or password", formData);
    // }

    const validPassword = await verifyPasswordHash(
      user ? user.passwordHash : "$argon",
      password
    );

    if (!user || !validPassword) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }

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

  await setCookieByKey("toast", "Sign In Success");
  redirect(ticketsPath());
};
