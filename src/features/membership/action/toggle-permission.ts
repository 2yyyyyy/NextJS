"use server";
import { revalidatePath } from "next/cache";
import {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { membershipsPath } from "@/path";
import { getAdminOrRedirect } from "../queries/get-admin-or-redirect";

type PermissionKey = "canDeleteTicket";

type TogglePermissionProps = {
  userId: string;
  organizationId: string;
  permissionKey: PermissionKey;
};

const togglePermission = async (
  { userId, organizationId, permissionKey }: TogglePermissionProps,
  _actionState: ActionState
  //   formData: FormData
) => {
  await getAdminOrRedirect(organizationId);
  const where = {
    membershipId: {
      userId,
      organizationId,
    },
  };

  const membership = await prisma.membership.findUnique({
    where,
  });

  if (!membership) {
    return toActionState("ERROR", "Membership not found");
  }

  await prisma.membership.update({
    where,
    data: {
      [permissionKey]: membership[permissionKey] === true ? false : true,
    },
  });

  revalidatePath(membershipsPath(organizationId));
  return toActionState("SUCCESS", "Permission toggled");
};

export { togglePermission };
