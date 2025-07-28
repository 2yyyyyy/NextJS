import { Button } from "@/components/ui/button";
import { ticketPath } from "@/path";
import { LucideSquareArrowUpRight } from "lucide-react";
import Link from "next/link";

const DetailButton = ({ ticketId }: { ticketId: string }) => {
  return (
    <Button asChild variant="outline" size="icon">
      <Link href={ticketPath(ticketId)}>
        <LucideSquareArrowUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );
};

export { DetailButton };
