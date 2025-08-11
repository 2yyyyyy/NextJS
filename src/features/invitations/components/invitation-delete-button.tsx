"use client";

import { LucideLoaderCircle, LucideLogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { deleteInvitation } from "@/features/invitations/action/delete-invitation";

type InvitationDeleteButtonProps = {
  organizationId: string;
  email: string;
};
const InvitationDeleteButton = ({
  organizationId,
  email,
}: InvitationDeleteButtonProps) => {
  const router = useRouter();
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteInvitation.bind(null, { organizationId, email }),
    trigger: (isPending) => (
      <Button variant="destructive" size="icon" disabled={isPending}>
        {isPending ? (
          <LucideLoaderCircle className="size-4 animate-spin" />
        ) : (
          <LucideLogOut className="size-4" />
        )}
      </Button>
    ),
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export { InvitationDeleteButton };
