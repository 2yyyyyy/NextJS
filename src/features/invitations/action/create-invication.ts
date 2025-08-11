"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { generateInvitationLink } from "@/features/invitations/action/generate-invitation-link";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { invitationsPath } from "@/path";

const createInvicationSchema = z.object({
  email: z.string().min(1, "Email is required").max(191).email(),
});

const createInvication = async (
  organizationId: string,
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAdminOrRedirect(organizationId);

  try {
    const { email } = createInvicationSchema.parse({
      email: formData.get("email"),
    });

    const targetMembersip = await prisma.membership.findFirst({
      where: {
        organizationId,
        user: {
          email,
        },
      },
    });

    if (targetMembersip) {
      return toActionState(
        "ERROR",
        "User is already a member of the organization"
      );
    }

    const emailInvitationLink = await generateInvitationLink(
      user.id,
      organizationId,
      email
    );

    console.log(emailInvitationLink);
    await inngest.send({
      name: "app/invitation.created",
      data: {
        userId: user.id,
        organizationId,
        email,
        emailInvitationLink,
      },
    });
  } catch (error) {
    return formErrorToActionState(error);
  }

  revalidatePath(invitationsPath(organizationId));
  return toActionState("SUCCESS", "User invited to organization");
};

export { createInvication };
