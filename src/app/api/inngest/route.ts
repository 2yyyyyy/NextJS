import { serve } from "inngest/next";
import { attachmentDeletedEvent } from "@/features/attachments/events/event-attachment-deleted";
import { emailVerificationEvent } from "@/features/auth/events/event-email-verification";
import { invitationCreateEvent } from "@/features/invitations/events/event-invitation-create";
import { passwordResetEvent } from "@/features/password/events/event-password-reset";
import { inngest } from "@/lib/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    passwordResetEvent,
    emailVerificationEvent,
    invitationCreateEvent,
    attachmentDeletedEvent,
  ],
});
