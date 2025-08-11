"use server";
import { MembershipRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { toActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { getMemberships } from "@/features/membership/queries/get-memberships";
import { prisma } from "@/lib/prisma";
import { membershipsPath } from "@/path";

type updateMembershipRoleProps = {
  organizationId: string;
  userId: string;
  membershipRole: MembershipRole;
};

export const updateMembershipRole = async ({
  organizationId,
  userId,
  membershipRole,
}: updateMembershipRoleProps) => {
  await getAuthOrRedirect();

  const memberships = await getMemberships(organizationId);

  // check if it's the membership exist
  const targetMembership = (memberships ?? []).find(
    (membership) => membership.userId === userId
  );

  if (!targetMembership) {
    return toActionState("ERROR", "Membership not found");
  }

  //   last admin
  const adminMemberShip = (memberships ?? []).filter(
    (membership) => membership.membershipRole === "ADMIN"
  );

  const removesAdmin = targetMembership.membershipRole === "ADMIN";
  const isLastAdmin = adminMemberShip.length <= 1;

  if (removesAdmin && isLastAdmin) {
    return toActionState(
      "ERROR",
      "You cannot delete the last admin of an organization"
    );
  }

  await prisma.membership.update({
    where: {
      membershipId: {
        userId,
        organizationId,
      },
    },
    data: {
      membershipRole,
    },
  });

  // revalidate
  revalidatePath(membershipsPath(organizationId));
  return toActionState("SUCCESS", "The role has been updated");
};
