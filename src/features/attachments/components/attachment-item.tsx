import { Attachment } from "@prisma/client";
import { LucideArrowUpRightFromSquare } from "lucide-react";
import Link from "next/link";
import { attachmentDownloadPath } from "@/path";

type AttachmentItemProps = {
  attachment: Attachment;
  buttons?: React.ReactNode;
};
const AttachmentItem = ({ attachment, buttons }: AttachmentItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <Link
        className="flex gap-x-2 items-center text-sm truncate"
        href={attachmentDownloadPath(attachment.id)}
      >
        <LucideArrowUpRightFromSquare className="size-4" />
        <p className="truncate">{attachment.name}</p>
        {/* {attachment.name} */}
      </Link>
      {buttons}
    </div>
  );
};

export { AttachmentItem };
