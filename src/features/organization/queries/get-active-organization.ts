import { getAuth } from "@/features/auth/queries/get-auth";
import { prisma } from "@/lib/prisma";

const getActiveOrganization = async () => {
  const { user } = await getAuth();
  if (!user) {
    return null;
  }
  const activeOrganization = await prisma.organization.findFirst({
    where: {
      memberships: {
        some: {
          userId: user.id,
          isActive: true,
        },
      },
    },
  });
  return activeOrganization;
};

export { getActiveOrganization };
