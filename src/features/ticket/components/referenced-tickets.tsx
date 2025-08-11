import { LucideArrowUpRightFromSquare } from "lucide-react";
import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import { getReferencedTickets } from "@/features/ticket/queries/get-referenced-tickets";
import { ticketPath } from "@/path";

export type ReferencedTicketsProps = {
  ticketId: string;
};

const ReferencedTickets = async ({ ticketId }: ReferencedTicketsProps) => {
  const referencedTickets = await getReferencedTickets(ticketId);

  if (!referencedTickets) {
    return null;
  }

  return (
    <CardCompact
      title="Referenced Tickets"
      description="Tickets that have been referenced in comments"
      content={
        <div className="mx-2 mb-4">
          {referencedTickets.map((referencedTicket) => (
            <div key={referencedTicket.id}>
              <Link
                className="flex gap-x-2 items-center text-sm"
                href={ticketPath(referencedTicket.id)}
              >
                <LucideArrowUpRightFromSquare className="size-4" />
                {referencedTicket.title}
              </Link>
            </div>
          ))}
        </div>
      }
    />
  );
};

export { ReferencedTickets };
