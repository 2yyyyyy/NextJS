"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/action/cookie";
import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { passwordForgetPath, signInPath } from "@/path";
import { hasToken } from "@/utils/crypto";

export const acceptInvitation = async (
  tokenId: string,
  _actionState: ActionState
) => {
  try {
    const tokenHash = hasToken(tokenId);

    const invitation = await prisma.invitation.findUnique({
      where: {
        tokenHash,
      },
    });

    if (!invitation) {
      return toActionState("ERROR", "Invitation not found");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: invitation.email,
      },
    });

    if (user) {
      await prisma.$transaction([
        prisma.invitation.delete({
          where: {
            tokenHash,
          },
        }),
        prisma.membership.create({
          data: {
            userId: user.id,
            organizationId: invitation.organizationId,
            isActive: false,
            membershipRole: "MEMBER",
          },
        }),
      ]);
    } else {
      await prisma.invitation.update({
        where: {
          tokenHash,
        },
        data: {
          status: "ACCEPTED_WITHOUT_ACCOUNT",
        },
      });
    }
  } catch (error) {
    return formErrorToActionState(error);
  }
  await setCookieByKey("toast", "Invitation accepted");
  redirect(signInPath());
};
