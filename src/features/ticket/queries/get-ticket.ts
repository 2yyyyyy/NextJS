import { prisma } from "@/lib/prisma";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getAuth } from "@/features/auth/queries/get-auth";

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

  return {
    ...ticket,
    isOwner: isOwner(user, ticket),
  };
};

export { getTicket };
