"use server";
import {
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { getMemberships } from "@/features/membership/queries/get-memberships";
import { prisma } from "@/lib/prisma";

export const deleteMembership = async (
  organizationId: string,
  userId: string
) => {
  const { user } = await getAuthOrRedirect();

  const memberships = await getMemberships(organizationId);

  // check if it's the last memberships
  const isLastMembership = (memberships ?? []).length === 1;

  if (isLastMembership) {
    return toActionState("ERROR", "Last membership cannot be deleted");
  }

  // check if it's the membership exist
  const targetMembership = (memberships ?? []).find(
    (membership) => membership.userId === userId
  );

  if (!targetMembership) {
    return toActionState("ERROR", "Membership not found");
  }

  // check if user deleting last admin
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

  // check if user is authorized
  const myMembership = (memberships ?? []).find(
    (membership) => membership.userId === user.id
  );
  const isMyself = userId === user.id;
  const isAdmin = myMembership?.membershipRole === "ADMIN";
  if (!isMyself && !isAdmin) {
    return toActionState("ERROR", "You can only delete memberships as a admin");
  }

  try {
    await prisma.membership.delete({
      where: {
        membershipId: {
          userId,
          organizationId,
        },
      },
    });
  } catch (error) {
    return formErrorToActionState(error);
  }

  //   revalidatePath(membershipsPath(organizationId));
  return toActionState(
    "SUCCESS",
    isMyself
      ? "You have left the organization"
      : "The membership has been deleted"
  );
};
