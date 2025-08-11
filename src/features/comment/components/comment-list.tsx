import { AttachmentDeleteButton } from "@/features/attachments/components/attachment-delete-button";
import { AttachmentList } from "@/features/attachments/components/attachment-list";
import { CommentWithMetadata } from "@/features/comment/type";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";

type CommentListProps = {
  comments: CommentWithMetadata[];
  onDeleteComment: () => void;
  onCreateAttachment?: () => void;
  onDeleteAttachment?: () => void;
};
const CommentList = ({
  comments,
  onDeleteComment,
  onDeleteAttachment,
}: CommentListProps) => {
  return (
    <>
      {comments.map((comment) => {
        const commentDeleteButton = (
          <CommentDeleteButton
            key="1"
            id={comment.id}
            onDeleteComment={onDeleteComment}
          />
        );
        const buttons = [...(comment.isOwner ? [commentDeleteButton] : [])];

        const sections = [];
        if (comment.attachments.length) {
          sections.push({
            label: "Attachments",
            content: (
              <AttachmentList
                attachments={comment.attachments}
                buttons={(attachmentId: string) => [
                  ...(comment.isOwner
                    ? [
                        <AttachmentDeleteButton
                          key={attachmentId}
                          id={attachmentId}
                          onDeleteAttachment={onDeleteAttachment}
                        />,
                      ]
                    : []),
                ]}
              />
            ),
          });
        }
        return (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={buttons}
            sections={sections}
          />
        );
      })}
    </>
  );
};

export { CommentList };
