import { AttachmentEntity } from "@prisma/client";
import * as attachmentSubjectDTO from "@/features/attachments/dto/attachment-create-dto";
import { prisma } from "@/lib/prisma";

export const getAttachmentSubject = async (
  entityId: string,
  entity: AttachmentEntity
) => {
  switch (entity) {
    case "TICKET":
      const ticket = await prisma.ticket.findUnique({
        where: {
          id: entityId,
        },
      });

      return attachmentSubjectDTO.formTicket(ticket);

    case "COMMENT":
      const comment = await prisma.comment.findUnique({
        where: {
          id: entityId,
        },
        include: {
          ticket: true,
        },
      });

      return attachmentSubjectDTO.formComment(comment);
    default:
      return null;
  }
};
