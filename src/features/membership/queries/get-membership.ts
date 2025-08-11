import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";

type getMembershipProps = {
  organizationId: string;
  userId: string;
};

const getMembership = async ({
  organizationId,
  userId,
}: getMembershipProps) => {
  await getAuthOrRedirect();
  return prisma.membership.findUnique({
    where: {
      membershipId: {
        organizationId,
        userId,
      },
    },
  });
};

export { getMembership };
