import { Content } from "@/components/content";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CommentWithMetadata } from "@/features/comment/type";

type CommentItemProps = {
  comment: CommentWithMetadata;
  buttons: React.ReactNode[];
  sections: {
    label: string;
    content: React.ReactNode;
  }[];
};

const CommentItem = ({ comment, buttons, sections }: CommentItemProps) => {
  return (
    <div className="flex gap-x-2">
      <Card className="flex flex-1 flex-col p-4 gap-y-1">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {comment?.user?.username ?? "Deleted User"}
          </p>
          <p className="text-sm text-muted-foreground">
            {comment.createdAt.toLocaleString()}
          </p>
        </div>
        <Content>{comment.content}</Content>

        {sections.map((section) => (
          <div key={section.label} className="space-y-2 mt-2">
            <Separator />
            <h4 className="text-sm text-muted-foreground">{section.label}</h4>
            <div>{section.content}</div>
          </div>
        ))}
      </Card>
      <div className="flex flex-col gap-y-1">{buttons}</div>
    </div>
  );
};

export { CommentItem };
