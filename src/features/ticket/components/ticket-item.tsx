import { Ticket } from "@prisma/client";
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
import { DetailButton } from "./detali-button";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  );

  return (
    <div
      className={clsx("w-full flex gap-x-1", {
        "max-w-[420px]": !isDetail,
        "max-w-[580px]": isDetail,
      })}
    >
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
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            <EditButton ticketId={ticket.id} />
            {moreMenu}
          </>
        ) : (
          <>
            <DetailButton ticketId={ticket.id} />
            <EditButton ticketId={ticket.id} />
            {moreMenu}
          </>
        )}
      </div>
    </div>
  );
};

export { TicketItem };
