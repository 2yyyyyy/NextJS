"use server";
import { revalidatePath } from "next/cache";
import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { getOrganizationsByUser } from "@/features/organization/queries/get-organization-by-user";
import { prisma } from "@/lib/prisma";
import { organizationPath } from "@/path";

const switchOrganization = async (
  organizationId: string,
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect({
    checkActiveOrganization: false,
  });
  try {
    const organizations = await getOrganizationsByUser();
    const canSwitch = organizations.some(
      (organization) => organization.id === organizationId
    );
    if (!canSwitch) {
      return toActionState("ERROR", "Not a member of the organization");
    }
    prisma.$transaction([
      prisma.membership.update({
        where: {
          membershipId: {
            userId: user.id,
            organizationId,
          },
        },
        data: {
          isActive: true,
        },
      }),
      prisma.membership.updateMany({
        where: {
          userId: user.id,
          organizationId: {
            not: organizationId,
          },
        },
        data: {
          isActive: false,
        },
      }),
    ]);
  } catch (error) {
    return formErrorToActionState(error);
  }
  revalidatePath(organizationPath());
  return toActionState("SUCCESS", "Organization switched");
};

export { switchOrganization };
