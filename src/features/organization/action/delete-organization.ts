"use server";
import {
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { prisma } from "@/lib/prisma";
import { getOrganizationsByUser } from "../queries/get-organization-by-user";

export const deleteOrganization = async (organizationId: string) => {
  await getAdminOrRedirect(organizationId);
  try {
    const organizations = await getOrganizationsByUser();
    const canDelete = organizations.some(
      (organization) => organization.id === organizationId
    );
    if (!canDelete) {
      return toActionState("ERROR", "Not a member of the organization");
    }

    await prisma.organization.delete({
      where: {
        id: organizationId,
      },
    });
  } catch (error) {
    return formErrorToActionState(error);
  }

  //   revalidatePath(organizationPath());
  return toActionState("SUCCESS", "Organization deleted");
};
