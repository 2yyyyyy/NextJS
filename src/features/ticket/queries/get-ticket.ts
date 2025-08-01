import { prisma } from "@/lib/prisma";

const getTicket = async (ticketId: string) => {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });
};

export { getTicket };
