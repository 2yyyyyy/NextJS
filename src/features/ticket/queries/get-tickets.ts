import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "@/features/ticket/search-params";

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams
) => {
  // const t0 = performance.now();
  // console.log("DB Seed: Started ...");
  const where = {
    userId,
    title: {
      mode: "insensitive" as const,
      contains: searchParams.search,
    },
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;
  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
      orderBy: {
        [searchParams.sortKey]: searchParams.sortValue,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    }),
    prisma.ticket.count({
      where,
    }),
  ]);

  // const t1 = performance.now();
  // console.log(`DB Seed: Finished (${t1 - t0}ms)`);

  return {
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: ticket.userId === userId,
    })),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
