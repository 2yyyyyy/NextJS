"use server";
import { MembershipRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/action/cookie";
import {
  ActionState,
  formErrorToActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";
const createOrganizationScheme = z.object({
  name: z.string().min(1, { message: "Is required" }).max(191),
});

export const createOrganization = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect({
    checkOrganization: false,
    checkActiveOrganization: false,
  });
  try {
    const data = createOrganizationScheme.parse(Object.fromEntries(formData));

    await prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: {
          ...data,
          memberships: {
            create: {
              userId: user.id,
              isActive: true,
              membershipRole: MembershipRole.ADMIN,
            },
          },
        },
      });
      await tx.membership.updateMany({
        where: {
          userId: user.id,
          organizationId: {
            not: organization.id,
          },
        },
        data: {
          isActive: false,
        },
      });
    });
  } catch (error) {
    return formErrorToActionState(error, formData);
  }

  await setCookieByKey("toast", "Organization created");
  redirect(ticketsPath());
};
