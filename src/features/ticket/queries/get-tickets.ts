import { PAGE_SIZE } from "@/components/pagination/page-size";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getActiveOrganization } from "@/features/organization/queries/get-active-organization";
import { getOrganizationsByUser } from "@/features/organization/queries/get-organization-by-user";
import { ParsedSearchParams } from "@/features/ticket/search-params";
import { prisma } from "@/lib/prisma";

export const getTickets = async (
  userId: string | undefined,
  byOrganization: boolean,
  searchParams: ParsedSearchParams
) => {
  // const t0 = performance.now();
  // console.log("DB Seed: Started ...");
  const { user } = await getAuth();

  if (!PAGE_SIZE.includes(searchParams.size)) {
    throw new Error("Invalid page size");
  }

  const activeOrganization = await getActiveOrganization();

  const where = {
    userId,
    title: {
      mode: "insensitive" as const,
      contains: searchParams.search,
    },
    ...(byOrganization && activeOrganization
      ? {
          organizationId: activeOrganization.id,
        }
      : {}),
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

  // const permission = await getTicketPermission({
  //   organizationId: activeOrganization?.id,
  //   userId: user?.id,
  // });

  const organizations = await getOrganizationsByUser();

  return {
    list: tickets.map((ticket) => {
      const organization = organizations.find(
        (organization) => organization.id === ticket.organizationId
      );
      return {
        ...ticket,
        isOwner: isOwner(user, ticket),
        permission: {
          canDeleteTicket:
            isOwner(user, ticket) &&
            !!organization?.membershipByUser.canDeleteTicket,
        },
      };
    }),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
