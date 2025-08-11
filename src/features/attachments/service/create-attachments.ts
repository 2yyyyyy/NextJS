import { AttachmentEntity } from "@prisma/client";
import * as attachmentData from "@/features/attachments/data";
import * as attachmentSubjectDTO from "@/features/attachments/dto/attachment-create-dto";
import { generateAttachmentKey } from "@/features/attachments/utils/generate-attachment-key";
import { client } from "@/lib/ali-oss";

type createAttachmentsArgs = {
  files: File[];
  entity: AttachmentEntity;
  entityId: string;
  subject: attachmentSubjectDTO.Type;
};

export const createAttachments = async ({
  files,
  entity,
  entityId,
  subject,
}: createAttachmentsArgs) => {
  const attachments = [];
  try {
    for (const file of files) {
      const buffer = await Buffer.from(await file.arrayBuffer());

      const attachment = await attachmentData.createAttachment({
        name: file.name,
        entity,
        entityId,
      });
      attachments.push(attachment);

      // const organizationId = getOrganizationIdByAttachment(entity, subject);

      const key = generateAttachmentKey({
        organizationId: subject.organizationId,
        entityId,
        entity,
        fileName: file.name,
        attachmentId: attachment.id,
      });
      await client.put(key, buffer);
    }
  } catch (error) {
    throw error;
  }
  return attachments;
};
