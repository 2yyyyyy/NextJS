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
import { membershipsPath, ticketsPath } from "@/path";
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
  let organization;
  try {
    const data = createOrganizationScheme.parse(Object.fromEntries(formData));

    // await prisma.$transaction(async (tx) => {
    organization = await prisma.organization.create({
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
    await prisma.membership.updateMany({
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
  } catch (error) {
    // );
    return formErrorToActionState(error, formData);
  }

  await setCookieByKey(
    "toast",
    `<a href="${membershipsPath(organization.id)}">Organization</a> created`
  );
  redirect(ticketsPath());
};
