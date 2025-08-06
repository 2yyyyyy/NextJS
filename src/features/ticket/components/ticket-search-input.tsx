"use client";
import { SearchInput } from "@/components/search-input";
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "@/features/ticket/search-params";
import { useQueryState, useQueryStates } from "nuqs";
type TicketSearchInputProps = {
  placeholder?: string;
};

const TicketSearchInput = ({ placeholder }: TicketSearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  return (
    <SearchInput
      placeholder={placeholder}
      value={search}
      onChange={setSearch}
    />
  );
};

export { TicketSearchInput };
