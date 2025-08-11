import { prisma } from "@/lib/prisma";

type GetTicketPermissionProps = {
  organizationId?: string;
  userId?: string;
};

const getTicketPermission = async ({
  organizationId,
  userId,
}: GetTicketPermissionProps) => {
  if (!organizationId || !userId) {
    return {
      canDeleteTicket: false,
    };
  }

  const membership = await prisma.membership.findFirst({
    where: {
      organizationId,
      userId,
    },
  });

  if (!membership) {
    return {
      canDeleteTicket: false,
    };
  }

  return {
    canDeleteTicket: membership.canDeleteTicket,
  };
};

export { getTicketPermission };
