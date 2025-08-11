"use server";
import {
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import * as attachmentData from "@/features/attachments/data";
import * as attachmentDTO from "@/features/attachments/dto/attachment-create-dto";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";

export const deleteAttachment = async (id: string) => {
  const { user } = await getAuthOrRedirect();

  const attachment = await attachmentData.getAttachment(id);

  // const subject = attachment?.ticket ?? attachment?.comment;
  let subject;
  switch (attachment?.entity) {
    case "TICKET":
      subject = attachmentDTO.formTicket(attachment.ticket);
      break;
    case "COMMENT":
      subject = attachmentDTO.formComment(attachment.comment);
      break;
  }

  if (!subject || !attachment) {
    return toActionState("ERROR", "Subject not found");
  }

  if (!isOwner(user, subject)) {
    return toActionState("ERROR", "Not authorized");
  }

  try {
    await prisma.attachment.delete({
      where: {
        id,
      },
    });

    await inngest.send({
      name: "app/attachment.deleted",
      data: {
        attachmentId: id,
        entityId: subject.entityId,
        entity: attachment.entity,
        fileName: attachment.name,
        organizationId: subject.organizationId,
      },
    });
  } catch (error) {
    return formErrorToActionState(error);
  }
  return toActionState("SUCCESS", "Attachment deleted");
};
