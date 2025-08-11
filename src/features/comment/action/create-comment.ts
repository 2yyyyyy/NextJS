"use server";

import { AttachmentEntity } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from "zod";
import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import * as attachmentSubjectDTO from "@/features/attachments/dto/attachment-create-dto";
import { filesSchema } from "@/features/attachments/schema/files";
import * as attachmentService from "@/features/attachments/service";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import * as commentData from "@/features/comment/data";
import * as ticketData from "@/features/ticket/data";
import { ticketPath } from "@/path";
import { findIdsFromText } from "@/utils/find-ids-from-text";

const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment must contain at least 1 character(s)")
    .max(1024, "Comment must contain at most 1024 character(s)"),
  files: filesSchema,
});

export const createComment = async (
  ticketId: string,
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect();
  let comment;
  try {
    const { content, files } = createCommentSchema.parse({
      content: formData.get("content"),
      files: formData.getAll("files"),
    });
    comment = await commentData.createComment({
      content,
      ticketId,
      userId: user.id,
      include: {
        user: {
          select: {
            username: true,
          },
        },
        ticket: true,
      },
    });

    const subject = attachmentSubjectDTO.formComment(comment);

    if (!subject) {
      throw new Error("Comment not create");
    }

    await attachmentService.createAttachments({
      entityId: comment.id,
      entity: AttachmentEntity.COMMENT,
      files,
      subject,
    });

    await ticketData.connectReferencedTickets(
      ticketId,
      findIdsFromText("tickets", content)
    );
  } catch (error) {
    return formErrorToActionState(error);
  }

  revalidatePath(ticketPath(ticketId));
  return toActionState("SUCCESS", "Comment created", formData, {
    ...comment,
    isOwner: true,
  });
};
