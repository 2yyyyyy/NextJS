import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type createCommentArgs<T> = {
  content: string;
  ticketId: string;
  userId: string;
  include: Prisma.Subset<T, Prisma.CommentInclude>;
};

export const createComment = async <T extends Prisma.CommentInclude>({
  content,
  ticketId,
  userId,
  include,
}: createCommentArgs<T>) => {
  return await prisma.comment.create({
    data: {
      content,
      ticketId,
      userId,
    },
    include,
  });
};
