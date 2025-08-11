"use client";
import { TicketStatus } from "@prisma/client";
import { LucideTrash } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateTicketStatus } from "@/features/ticket/action/update-ticket-status";
import { TICKET_LABELS } from "@/features/ticket/constants";
import { useConfirmDialog } from "../../../components/confirm-dialog";
import { deleteTicket } from "../action/delete-ticket";
import { TicketWithMetadata } from "../type";

export type TicketMoreMenuProps = {
  ticket: TicketWithMetadata;
  trigger: React.ReactNode;
};

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem disabled={!ticket.permission.canDeleteTicket}>
        <LucideTrash className="size-4" />
        <span className="cursor-default">Delete</span>
      </DropdownMenuItem>
    ),
  });

  const handleUpdateTicketStatus = async (value: string) => {
    const promise = updateTicketStatus(ticket.id, value as TicketStatus);

    toast.promise(promise, {
      loading: "Updating status ...",
    });

    const result = await promise;

    if (result.status === "SUCCESS") {
      toast.success(result.message);
    } else if (result.status === "ERROR") {
      toast.error(result.message);
    }
  };

  const ticketStatusRadioGroupItem = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {Object.entries(TICKET_LABELS).map(([key, label]) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {label}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <>
      {deleteDialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          {ticketStatusRadioGroupItem}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { TicketMoreMenu };
