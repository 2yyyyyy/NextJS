import { AttachmentEntity } from "@prisma/client";

type GenerateAttachmentKeyProps = {
  organizationId: string;
  entityId: string;
  entity: AttachmentEntity;
  fileName: string;
  attachmentId: string;
};

const generateAttachmentKey = ({
  organizationId,
  entityId,
  entity,
  fileName,
  attachmentId,
}: GenerateAttachmentKeyProps) => {
  return `${organizationId}/${entity}/${entityId}/${fileName}-${attachmentId}.${
    fileName.split(".")[fileName.split(".").length - 1]
  }`;
};

export { generateAttachmentKey };
