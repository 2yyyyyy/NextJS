import clsx from "clsx";
import { LucideMoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditButton } from "@/features/ticket/components/edit-button";
import { TicketMoreMenu } from "@/features/ticket/components/ticket-more-menu";
import { TICKET_ICONS } from "@/features/ticket/constants";
import { toCurrencyFromCent } from "@/utils/currency";
import { TicketWithMetadata } from "../type";
import { DetailButton } from "./detali-button";

type TicketItemProps = {
  ticket: TicketWithMetadata;
  isDetail?: boolean;
  comments?: React.ReactNode;
  attachments?: React.ReactNode;
  referencedTickets?: React.ReactNode;
};

const TicketItem = ({
  ticket,
  isDetail,
  comments,
  attachments,
  referencedTickets,
}: TicketItemProps) => {
  const isTicketOwner = ticket.isOwner;
  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="size-4" />
        </Button>
      }
    />
  );

  return (
    <div
      className={clsx("w-full flex flex-col gap-y-4", {
        "max-w-[420px]": !isDetail,
        "max-w-[580px]": isDetail,
      })}
    >
      <div className="flex gap-x-2">
        <Card key={ticket.id} className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2">
              <span>{TICKET_ICONS[ticket.status]}</span>
              <span className="truncate text-2xl">{ticket.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={clsx({
                "line-clamp-3": !isDetail,
              })}
            >
              {ticket.content}
            </span>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {toCurrencyFromCent(ticket.bounty)}
            </p>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-y-1">
          {isDetail ? (
            <>
              {isTicketOwner && <EditButton ticketId={ticket.id} />}
              {isTicketOwner && moreMenu}
            </>
          ) : (
            <>
              <DetailButton ticketId={ticket.id} />
              {isTicketOwner && <EditButton ticketId={ticket.id} />}
              {isTicketOwner && moreMenu}
            </>
          )}
        </div>
      </div>
      {referencedTickets}
      {attachments}
      {comments}
    </div>
  );
};

export { TicketItem };
