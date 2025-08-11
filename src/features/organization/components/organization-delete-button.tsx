"use client";

import { LucideLoader, LucideTrash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { deleteOrganization } from "@/features/organization/action/delete-organization";

type OrganizationDeleteButtonProps = {
  organizationId: string;
};
const OrganizationDeleteButton = ({
  organizationId,
}: OrganizationDeleteButtonProps) => {
  const router = useRouter();
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteOrganization.bind(null, organizationId),
    trigger: (isPending) => (
      <Button variant="destructive" size="icon" disabled={isPending}>
        {isPending ? (
          <LucideLoader className="size-4 animate-spin" />
        ) : (
          <LucideTrash className="size-4" />
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

export { OrganizationDeleteButton };
