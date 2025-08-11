import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getComments } from "@/features/comment/queries/get-comments";
import { CommentWithMetadata } from "@/features/comment/type";
import { PaginatedData } from "@/type/pagination";

const usePaginatedComments = (
  ticketId: string,
  paginatedComments: PaginatedData<CommentWithMetadata>
) => {
  const queryKey = ["comments", ticketId];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as number | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    });

  const queryClient = useQueryClient();

  const comments = data.pages.flatMap((page) => page.list);
  return {
    comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    onDeleteComment: () => queryClient.invalidateQueries({ queryKey }),
    onCreateComment: () => queryClient.invalidateQueries({ queryKey }),
    onDeleteAttachment: () => queryClient.invalidateQueries({ queryKey }),
  };
};

export { usePaginatedComments };
