import { LucidePlus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { OrganizationList } from "@/features/organization/components/organization-list";
import { getOrganizationsByUser } from "@/features/organization/queries/get-organization-by-user";
import { onboardingPath, ticketsPath } from "@/path";

const SelectActiveOrganizationPage = async () => {
  const organizations = await getOrganizationsByUser();
  const isActive = organizations.some(
    (organization) => organization.membershipByUser.isActive
  );
  if (isActive) {
    redirect(ticketsPath());
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Select Organizations"
        description="Pick one organization to work with"
        actions={
          <Button asChild>
            <Link href={onboardingPath()}>
              <LucidePlus className="size-4" />
              Create Organization
            </Link>
          </Button>
        }
      />
      <Suspense fallback={<Spinner />}>
        <OrganizationList limitAccess />
      </Suspense>
    </div>
  );
};

export default SelectActiveOrganizationPage;
