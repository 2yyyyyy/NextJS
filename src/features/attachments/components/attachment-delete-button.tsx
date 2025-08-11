"use client";
import { LucideLoaderCircle, LucideTrash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { deleteAttachment } from "../action/delete-attachment";

type AttachmentDeleteButtonProps = {
  id: string;
  onDeleteAttachment?: () => void;
};
const AttachmentDeleteButton = ({
  id,
  onDeleteAttachment,
}: AttachmentDeleteButtonProps) => {
  const router = useRouter();
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteAttachment.bind(null, id),
    trigger: (isPending) => (
      <Button variant="destructive" size="xs" disabled={isPending}>
        {isPending ? (
          <LucideLoaderCircle className="size-4 animate-spin" />
        ) : (
          <LucideTrash className="size-4" />
        )}
      </Button>
    ),
    onSuccess: () => {
      onDeleteAttachment?.();
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

export { AttachmentDeleteButton };
