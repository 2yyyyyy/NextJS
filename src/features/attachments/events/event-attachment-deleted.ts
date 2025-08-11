import { AttachmentEntity } from "@prisma/client";
import { client } from "@/lib/ali-oss";
import { inngest } from "@/lib/inngest";
import { generateAttachmentKey } from "../utils/generate-attachment-key";

export type AttachmentDeletedEventArgs = {
  data: {
    attachmentId: string;
    entityId: string;
    entity: AttachmentEntity;
    fileName: string;
    organizationId: string;
  };
};

export const attachmentDeletedEvent = inngest.createFunction(
  {
    id: "attachment-deleted",
  },
  {
    event: "app/attachment.deleted",
  },
  async ({ event }) => {
    const { attachmentId, entityId, entity, fileName, organizationId } =
      event.data;
    try {
      await client.delete(
        generateAttachmentKey({
          organizationId,
          entityId,
          entity,
          fileName,
          attachmentId,
        })
      );
    } catch (error) {
      console.log(error);
      return { event, body: false };
    }
    return { event, body: true };
  }
);
