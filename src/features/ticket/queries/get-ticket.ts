import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getTicketPermission } from "@/features/ticket/permission/get-ticket-permission";
import { prisma } from "@/lib/prisma";

const getTicket = async (ticketId: string) => {
  const { user } = await getAuth();

  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!ticket) {
    return null;
  }

  const permission = await getTicketPermission({
    organizationId: ticket.organizationId,
    userId: user?.id,
  });

  return {
    ...ticket,
    isOwner: isOwner(user, ticket),
    permission: {
      canDeleteTicket: isOwner(user, ticket) && permission.canDeleteTicket,
    },
  };
};

export { getTicket };
