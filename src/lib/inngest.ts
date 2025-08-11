import { EventSchemas, Inngest } from "inngest";
import { AttachmentDeletedEventArgs } from "@/features/attachments/events/event-attachment-deleted";
import { EmailVerificationEventArgs } from "@/features/auth/events/event-email-verification";
import { InvitationCreateEventArgs } from "@/features/invitations/events/event-invitation-create";
import { PasswordResetEventArgs } from "@/features/password/events/event-password-reset";

type Events = {
  "app/password.password-reset": PasswordResetEventArgs;
  "app/auth.sign-up": EmailVerificationEventArgs;
  "app/invitation.created": InvitationCreateEventArgs;
  "app/attachment.deleted": AttachmentDeletedEventArgs;
};

export const inngest = new Inngest({
  id: "TicketBounty",
  schemas: new EventSchemas().fromRecord<Events>(),
});
