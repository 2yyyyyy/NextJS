import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Heading } from "@/components/heading";
import { Placeholder } from "@/components/placeholder";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { searchParamsCache } from "@/features/ticket/search-params";

type HomePageProps = {
  searchParams: SearchParams;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="All Tickets"
        description="Tickets by everyone at one place"
      />

      <ErrorBoundary fallback={<Placeholder label={"Something went wrong!"} />}>
        <Suspense fallback={<Spinner />}>
          <TicketList
            searchParams={searchParamsCache.parse(await searchParams)}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
