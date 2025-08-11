import { AttachmentEntity } from "@prisma/client";
import { CardCompact } from "@/components/card-compact";
import { AttachmentCreateForm } from "@/features/attachments/components/attachment-create-form";
import { getAttachments } from "@/features/attachments/quries/get-attachments";
import { AttachmentDeleteButton } from "./attachment-delete-button";
import { AttachmentList } from "./attachment-list";

type AttachmentsProps = {
  entityId: string;
  isOwner: boolean;
  entity: AttachmentEntity;
};
const Attachments = async ({ entityId, isOwner, entity }: AttachmentsProps) => {
  const attachments = await getAttachments(entityId, entity);
  return (
    <CardCompact
      title="Attachments"
      description="Attached images or PDFs"
      content={
        <>
          <AttachmentList
            attachments={attachments}
            buttons={(attachmentId: string) => [
              ...(isOwner
                ? [
                    <AttachmentDeleteButton
                      key={attachmentId}
                      id={attachmentId}
                    />,
                  ]
                : []),
            ]}
          />
          {isOwner && (
            <AttachmentCreateForm entityId={entityId} entity={entity} />
          )}
        </>
      }
    />
  );
};

export { Attachments };
