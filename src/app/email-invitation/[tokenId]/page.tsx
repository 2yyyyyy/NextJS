import { CardCompact } from "@/components/card-compact";
import { InvitationAcceptForm } from "@/features/invitations/components/invitation-accept-form";

type EmailInvitationPageProps = {
  params: Promise<{
    tokenId: string;
  }>;
};

const EmailInvitationPage = async ({ params }: EmailInvitationPageProps) => {
  const { tokenId } = await params;

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Invitation to Organization"
        description="Accept the invitation to join the organization"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<InvitationAcceptForm tokenId={tokenId} />}
      />
    </div>
  );
};

export default EmailInvitationPage;
