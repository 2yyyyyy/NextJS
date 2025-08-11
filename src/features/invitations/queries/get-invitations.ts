import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { prisma } from "@/lib/prisma";

const getInvitations = async (organizationId: string) => {
  await getAdminOrRedirect(organizationId);
  return prisma.invitation.findMany({
    where: {
      organizationId,
    },
    select: {
      email: true,
      createdAt: true,
      invitedByUser: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });
};

export { getInvitations };
