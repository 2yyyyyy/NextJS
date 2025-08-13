"use client";
import { useQueryState, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";
import { Pagination } from "@/components/pagination/pagination";
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "@/features/ticket/search-params";
import { TicketWithMetadata } from "@/features/ticket/type";
import { PaginatedData } from "@/type/pagination";

type TicketPaginationProps = {
  paginationTicketMetadata: PaginatedData<TicketWithMetadata>["metadata"];
};

const TicketPagination = ({
  paginationTicketMetadata,
}: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );
  const [search, setSearch] = useQueryState("search", searchParser);

  const prevSearch = useRef(search);
  useEffect(() => {
    if (prevSearch.current === search) return;
    prevSearch.current = search;
    setPagination({
      ...pagination,
      page: 0,
    });
  }, [search, setPagination, pagination]);
  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginationMetadata={paginationTicketMetadata}
    />
  );
};

export { TicketPagination };
