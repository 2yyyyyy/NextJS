"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { generateCredential } from "@/features/credential/utils/generate-credential";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { credentialsPath } from "@/path";

const createCredentialSchema = z.object({
  name: z.string().min(1, "Is required").max(191),
});

const createCredential = async (
  organizationId: string,
  _actionState: ActionState,
  formData: FormData
) => {
  await getAdminOrRedirect(organizationId);
  let secret;

  try {
    const { name } = createCredentialSchema.parse({
      name: formData.get("name"),
    });

    secret = await generateCredential(organizationId, name);
  } catch (error) {
    return formErrorToActionState(error);
  }

  revalidatePath(credentialsPath(organizationId));

  return toActionState(
    "SUCCESS",
    `copy the secret, we will not show it again: ${secret}`
  );
};

export { createCredential };
