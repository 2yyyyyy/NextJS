import { NextRequest } from "next/server";
import * as attachmentDate from "@/features/attachments/data";
import * as attachmentDTO from "@/features/attachments/dto/attachment-create-dto";
import { generateAttachmentKey } from "@/features/attachments/utils/generate-attachment-key";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { client } from "@/lib/ali-oss";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ attachmentId: string }> }
) {
  await getAuthOrRedirect();
  const { attachmentId } = await params;

  const attachment = await attachmentDate.getAttachment(attachmentId);

  let subject;
  switch (attachment?.entity) {
    case "TICKET":
      subject = attachmentDTO.formTicket(attachment.ticket);
      break;
    case "COMMENT":
      subject = attachmentDTO.formComment(attachment.comment);
      break;
  }
  if (!subject || !attachment) {
    throw new Error("Subject not found");
  }

  const presignedUrl = await client.signatureUrl(
    generateAttachmentKey({
      organizationId: subject.organizationId,
      entityId: subject.entityId,
      entity: attachment.entity,
      fileName: attachment.name,
      attachmentId,
    }),
    {
      expires: 5 * 60,
    }
  );
  const response = await fetch(presignedUrl);

  const headers = new Headers();
  // 对文件名进行URL编码处理
  headers.append(
    "Content-Disposition",
    `attachment; filename="${encodeURIComponent(
      attachment.name
    )}"; filename*=UTF-8''${encodeURIComponent(attachment.name)}`
  );
  return new Response(response.body, {
    headers,
  });
}
