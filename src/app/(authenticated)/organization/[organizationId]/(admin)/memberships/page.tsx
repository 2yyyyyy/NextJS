import { Suspense } from "react";
import { OrganizationBreadcrumbs } from "@/app/(authenticated)/organization/[organizationId]/(admin)/_navigation/tabs";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { InvitationCreateButton } from "@/features/invitations/components/invitation-create-button";
import { MembershipList } from "@/features/membership/components/membership-list";

type MembershipsProps = {
  params: Promise<{
    organizationId: string;
  }>;
};

const MembershipsPage = async ({ params }: MembershipsProps) => {
  const { organizationId } = await params;
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Memberships"
        description="Manage members in your organization"
        tabs={<OrganizationBreadcrumbs />}
        actions={<InvitationCreateButton organizationId={organizationId} />}
      />
      <Suspense fallback={<Spinner />}>
        <MembershipList organizationId={organizationId} />
      </Suspense>
    </div>
  );
};

export default MembershipsPage;
