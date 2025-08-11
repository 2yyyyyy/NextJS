"use server";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/action/cookie";
import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { hashPassword } from "@/features/password/utils/hash-and-verify";
import { inngest } from "@/lib/inngest";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";
const SignUpScheme = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine((value) => !value.includes(" "), {
        message: "Username cannot contain spaces",
      }),
    email: z.string().min(1, { message: "Is required" }).max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { username, email, password } = SignUpScheme.parse(
      Object.fromEntries(formData)
    );

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    const invitations = await prisma.invitation.findMany({
      where: {
        email,
      },
    });

    await prisma.$transaction([
      prisma.invitation.deleteMany({
        where: {
          email,
          status: "ACCEPTED_WITHOUT_ACCOUNT",
        },
      }),
      prisma.membership.createMany({
        data: invitations.map((invitation) => ({
          organizationId: invitation.organizationId,
          userId: user.id,
          isActive: false,
          membershipRole: "MEMBER",
        })),
      }),
    ]);

    inngest.send({
      name: "app/auth.sign-up",
      data: {
        userId: user.id,
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
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return toActionState(
        "ERROR",
        "Either username or email already exists",
        formData
      );
    }
    return formErrorToActionState(error, formData);
  }
  await setCookieByKey("toast", "Sign Up Success");
  redirect(ticketsPath());
};
