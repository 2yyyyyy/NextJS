import { CardCompact } from "@/components/card-compact";
import { OrganizationCreateForm } from "@/features/organization/components/organization-create-form";

const organizationCreatePage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Create Organization"
        description="Create a new organization for your team"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<OrganizationCreateForm />}
      />
    </div>
  );
};

export default organizationCreatePage;
