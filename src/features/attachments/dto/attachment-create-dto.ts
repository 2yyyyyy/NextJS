import { AttachmentEntity } from "@prisma/client";
import { AttachmentSubject, isComment, isTicket } from "../types";

export const formTicket = (ticket: AttachmentSubject | null) => {
  if (!ticket || !isTicket(ticket)) {
    return null;
  }

  return {
    entity: "TICKET" as AttachmentEntity,
    entityId: ticket.id,
    organizationId: ticket.organizationId,
    userId: ticket.userId,
    ticketId: ticket.id,
    commentId: null,
  };
};

export const formComment = (comment: AttachmentSubject | null) => {
  if (!comment || !isComment(comment)) {
    return null;
  }

  return {
    entity: "COMMENT" as AttachmentEntity,
    entityId: comment.id,
    organizationId: comment.ticket.organizationId,
    userId: comment.userId,
    ticketId: comment.ticket.id,
    commentId: comment.id,
  };
};

export type Type = {
  entity: AttachmentEntity;
  entityId: string;
  organizationId: string;
  userId: string | null;
  ticketId: string;
  commentId: string | null;
};
