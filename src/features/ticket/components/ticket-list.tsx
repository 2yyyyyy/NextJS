import { Placeholder } from "@/components/placeholder";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { TicketPagination } from "@/features/ticket/components/ticket-pagination";
import { TicketSearchInput } from "@/features/ticket/components/ticket-search-input";
import { TicketSortSelect } from "@/features/ticket/components/ticket-sort-select";
import { getTickets } from "@/features/ticket/queries/get-tickets";
import { ParsedSearchParams } from "@/features/ticket/search-params";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const { list: tickets, metadata: ticketMetadata } = await getTickets(
    userId,
    searchParams
  );
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="w-full max-w-[420px] flex gap-x-2">
        <TicketSearchInput placeholder="Search tickets ..." />
        <TicketSortSelect
          options={[
            { label: "Newest", sortKey: "createdAt", sortValue: "desc" },
            { label: "Bounty", sortKey: "bounty", sortValue: "desc" },
          ]}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => {
          return <TicketItem key={ticket.id} ticket={ticket} />;
        })
      ) : (
        <Placeholder label="No tickets found" />
      )}

      <div className="w-full max-w-[420px]">
        <TicketPagination paginationTicketMetadata={ticketMetadata} />
      </div>
    </div>
  );
};

export { TicketList };
