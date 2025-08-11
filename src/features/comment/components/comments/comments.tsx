"use client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { CardCompact } from "@/components/card-compact";
import { Skeleton } from "@/components/ui/skeleton";
import { CommentCreateForm } from "@/features/comment/components/comment-create-from";
import { CommentDeleteButton } from "@/features/comment/components/comment-delete-button";
import { CommentItem } from "@/features/comment/components/comment-item";
import { getComments } from "@/features/comment/queries/get-comments";
import { CommentWithMetadata } from "@/features/comment/type";
import { PaginatedData } from "@/type/pagination";
import { CommentList } from "../comment-list";
import { usePaginatedComments } from "./use-paginated-comments";

type CommentProps = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

const Comments = ({ ticketId, paginatedComments }: CommentProps) => {
  const {
    comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    onDeleteComment,
    onCreateComment,
    onDeleteAttachment,
  } = usePaginatedComments(ticketId, paginatedComments);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={onCreateComment}
          />
        }
      />
      <div className="flex flex-col gap-y-2 ml-8">
        <CommentList
          comments={comments}
          onDeleteComment={onDeleteComment}
          onDeleteAttachment={onDeleteAttachment}
        />

        {isFetchingNextPage && (
          <>
            <div className="flex gap-x-2">
              <Skeleton className="h-[82px] w-full" />
              <Skeleton className="h-[40px] w-[40px]" />
            </div>
            <div className="flex gap-x-2">
              <Skeleton className="h-[82px] w-full" />
              <Skeleton className="h-[40px] w-[40px]" />
            </div>
          </>
        )}
      </div>
      <div ref={ref}>
        {!hasNextPage && (
          <p className="text-right text-xs italic">No more comments.</p>
        )}
      </div>
    </>
  );
};

export { Comments };
