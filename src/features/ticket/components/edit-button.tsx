import { LucidePencil } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ticketEditPath } from "@/path";

const EditButton = ({ ticketId }: { ticketId: string }) => {
  return (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketEditPath(ticketId)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  );
};

export { EditButton };
