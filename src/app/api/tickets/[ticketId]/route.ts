import { getTicket } from "@/features/ticket/queries/get-ticket";

export async function GET(
  _req: Request,
  { params }: { params: { ticketId: string } }
) {
  const ticket = await getTicket(params.ticketId);
  return Response.json(ticket);
}
