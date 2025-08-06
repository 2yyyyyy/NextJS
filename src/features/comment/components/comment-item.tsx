import { Card } from "@/components/ui/card";
import { CommentWithMetadata } from "@/features/comment/type";

type CommentItemProps = {
  comment: CommentWithMetadata;
  buttons: React.ReactNode[];
};

const CommentItem = ({ comment, buttons }: CommentItemProps) => {
  return (
    <div className="flex gap-x-2 min-h-[120px]">
      <Card className="flex flex-1 flex-col p-4 gap-y-1">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground font-medium">
            {comment?.user?.username ?? "Deleted User"}
          </p>
          <p className="text-sm text-muted-foreground">
            {comment.createdAt.toLocaleString()}
          </p>
        </div>
        <p>{comment.content}</p>
      </Card>
      <div className="flex flex-col gap-y-1">{buttons}</div>
    </div>
  );
};

export { CommentItem };
