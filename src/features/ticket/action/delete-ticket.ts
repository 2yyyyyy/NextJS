"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/action/cookie";
import {
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { deleteAttachment } from "@/features/attachments/action/delete-attachment";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";
import { getTicketPermission } from "../permission/get-ticket-permission";

export const deleteTicket = async (ticketId: string) => {
  const { user } = await getAuthOrRedirect();
  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });
    if (!ticket || !isOwner(user, ticket)) {
      return toActionState("ERROR", "Not Authorized");
    }

    const permission = await getTicketPermission({
      userId: user.id,
      organizationId: ticket.organizationId,
    });

    if (!permission.canDeleteTicket) {
      return toActionState("ERROR", "Not Authorized");
    }

    const comments = await prisma.comment.findMany({
      where: {
        ticketId,
      },
    });

    const attachments_tickets = await prisma.attachment.findMany({
      where: {
        ticketId,
      },
    });

    const attachments_comments = await prisma.attachment.findMany({
      where: {
        comment: {
          ticketId,
        },
      },
    });

    const attachments = [...attachments_tickets, ...attachments_comments];

    for (const attachment of attachments) {
      await deleteAttachment(attachment.id);
    }

    await prisma.ticket.delete({
      where: {
        id: ticketId,
      },
    });

    // await client
  } catch (error) {
    return formErrorToActionState(error);
  }
  revalidatePath(ticketsPath());
  await setCookieByKey("toast", "Ticket deleted");
  redirect(ticketsPath());
};
