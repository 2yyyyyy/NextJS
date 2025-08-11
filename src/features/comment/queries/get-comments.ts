"use server";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

const getComments = async (ticketId: string, cursor?: number) => {
  const { user } = await getAuth();

  // const skip = cursor ? 1 : 0;
  const take = 2;

  const where = {
    ticketId,
    createdAt: {
      lt: cursor ? new Date(cursor) : undefined,
    },
  };

  let [comments, total] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      take: take + 1,
      include: {
        user: {
          select: {
            username: true,
          },
        },
        attachments: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  const hasNextPage = comments.length > take;
  if (hasNextPage) {
    comments = comments.slice(0, -1);
  }

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count: total,
      hasNextPage,
      cursor: comments.at(-1)?.createdAt.valueOf(),
    },
  };
};

export { getComments };
