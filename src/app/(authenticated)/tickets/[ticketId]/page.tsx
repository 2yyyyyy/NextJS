import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Comments } from "@/features/comment/components/comments";
import { getComments } from "@/features/comment/queries/get-comments";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { homePath } from "@/path";

type TicketPageParams = {
  params: {
    ticketId: string;
  };
};

const TicketPage = async ({ params }: TicketPageParams) => {
  const { ticketId } = await params;
  const ticketPromise = getTicket(ticketId);
  const commentsPromise = getComments(ticketId);
  const [ticket, paginatedComments] = await Promise.all([
    ticketPromise,
    commentsPromise,
  ]);
  if (!ticket) {
    notFound();
  }
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title },
        ]}
      />
      <Separator />
      <div className="flex justify-center animate-fade-in-from-top">
        <TicketItem
          ticket={ticket}
          isDetail
          comments={
            <Comments
              paginatedComments={paginatedComments}
              ticketId={ticketId}
            />
          }
        />
      </div>
    </div>
  );
};

export default TicketPage;
