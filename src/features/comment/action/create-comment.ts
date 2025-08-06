"use server";

import { revalidatePath } from "next/cache";
import z from "zod";
import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/path";

const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment must contain at least 1 character(s)")
    .max(1024, "Comment must contain at most 1024 character(s)"),
});

export const createComment = async (
  ticketId: string,
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect();
  let comment;
  try {
    const data = createCommentSchema.parse(Object.fromEntries(formData));
    comment = await prisma.comment.create({
      data: {
        ...data,
        ticketId,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
  } catch (error) {
    return formErrorToActionState(error);
  }

  revalidatePath(ticketPath(ticketId));
  return toActionState("SUCCESS", "Comment created", formData, {
    ...comment,
    isOwner: true,
  });
};
