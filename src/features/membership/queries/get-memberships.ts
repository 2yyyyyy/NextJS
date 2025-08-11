import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";

const getMemberships = async (organizationId: string) => {
  await getAuthOrRedirect();
  return prisma.membership.findMany({
    where: {
      organizationId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          emailVerified: true,
        },
      },
    },
  });
};

export { getMemberships };
