"use client";
import { LucideLoader, LucideTrash } from "lucide-react";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { deleteComment } from "@/features/comment/action/delete-comment";

type CommentDeleteButtonProps = {
  id: string;
  onDeleteComment?: (id: string) => void;
  isPending?: boolean;
};

const CommentDeleteButton = ({
  id,
  onDeleteComment,
}: CommentDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, id),
    trigger: (isPending) => (
      <Button variant="outline" size="icon" disabled={isPending}>
        {isPending ? (
          <LucideLoader className="size-4 animate-spin" />
        ) : (
          <LucideTrash className="size-4" />
        )}
      </Button>
    ),
    onSuccess: () => onDeleteComment?.(id),
  });
  return (
    <>
      {deleteButton}
      {deleteDialog}
    </>
  );
};

export { CommentDeleteButton };
