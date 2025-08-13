"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/action/cookie";
import {
  ActionState,
  formErrorToActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { passwordForgetPath, signInPath } from "@/path";
import { hashToken } from "@/utils/crypto";
import { hashPassword } from "../utils/hash-and-verify";
const PasswordResetScheme = z
  .object({
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

export const passwordReset = async (
  tokenId: string,
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const { password } = PasswordResetScheme.parse(
      Object.fromEntries(formData)
    );

    const tokenHash = hashToken(tokenId);

    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: {
        tokenHash,
      },
    });

    if (passwordResetToken) {
      await prisma.passwordResetToken.delete({
        where: {
          tokenHash,
        },
      });
    }

    if (!passwordResetToken || passwordResetToken.expiresAt < new Date()) {
      //   return toActionState("ERROR", "Invalid or expired password reset token");
      await setCookieByKey("toast", "Invalid or expired password reset token");
      redirect(passwordForgetPath());
    }

    await prisma.session.deleteMany({
      where: {
        userId: passwordResetToken.userId,
      },
    });

    const passwordHash = await hashPassword(password);

    await prisma.user.update({
      where: {
        id: passwordResetToken.userId,
      },
      data: {
        passwordHash,
      },
    });
  } catch (error) {
    // 关键：判断是否是 redirect 错误，如果是则重新抛出
    if ((error as any).digest.split(";")[0] === "NEXT_REDIRECT") {
      throw error; // 让 redirect 错误继续传播，触发重定向
    }
    return formErrorToActionState(error, formData);
  }
  await setCookieByKey("toast", "Successfully reset password");
  redirect(signInPath());
};
