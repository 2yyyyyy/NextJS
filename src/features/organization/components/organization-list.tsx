import { format } from "date-fns";
import {
  LucideArrowLeftRight,
  LucideArrowUpRightFromSquare,
  LucidePen,
} from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "@/components/form/submit-button";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrganizationDeleteButton } from "@/features/organization/components/organization-delete-button";
import { OrganizetionSwitchButton } from "@/features/organization/components/organizetion-switch-button";
import { getOrganizationsByUser } from "@/features/organization/queries/get-organization-by-user";
import { membershipsPath, organizationPath } from "@/path";
import { MembershipDeleteButton } from "../../membership/components/membership-delete-button";

type OrganizationListProps = {
  limitAccess?: boolean;
};

const OrganizationList = async ({ limitAccess }: OrganizationListProps) => {
  const organizations = await getOrganizationsByUser();
  const hasActive = organizations.some((organization) => {
    return organization.membershipByUser.isActive;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Joined At</TableHead>
          <TableHead>Members</TableHead>
          <TableHead>My Role</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations.map((organization) => {
          const isActive = organization.membershipByUser.isActive;
          const isAdmin =
            organization.membershipByUser.membershipRole === "ADMIN";
          const switchButton = (
            <OrganizetionSwitchButton
              organizationId={organization.id}
              trigger={
                <SubmitButton
                  icon={<LucideArrowLeftRight />}
                  label={
                    !hasActive ? "Activate" : isActive ? "Active" : "Switch"
                  }
                  variant={
                    !hasActive ? "secondary" : isActive ? "default" : "outline"
                  }
                  className="w-24"
                  disabled={hasActive && isActive}
                />
              }
            />
          );
          const detailButton = (
            <Button variant="outline" size="icon" asChild>
              <Link prefetch href={membershipsPath(organization.id)}>
                <LucideArrowUpRightFromSquare className="size-4" />
              </Link>
            </Button>
          );
          const editButton = (
            <Button variant="outline" size="icon">
              <LucidePen className="size-4" />
            </Button>
          );
          const deleteButton = (
            <OrganizationDeleteButton organizationId={organization.id} />
          );
          const leaveButton = (
            <MembershipDeleteButton
              organizationId={organization.id}
              userId={organization.membershipByUser.userId}
            />
          );
          const placeholder = (
            <Button size="icon" disabled className="disabled:opacity-0" />
          );
          const button = (
            <>
              {switchButton}
              {limitAccess ? null : isAdmin ? detailButton : placeholder}
              {limitAccess ? null : isAdmin ? editButton : placeholder}
              {limitAccess ? null : leaveButton}
              {limitAccess ? null : isAdmin ? deleteButton : placeholder}
            </>
          );
          return (
            <TableRow key={organization.id}>
              <TableCell>{organization.id}</TableCell>
              <TableCell>{organization.name}</TableCell>
              <TableCell>
                {format(
                  organization.membershipByUser.joinAt,
                  "yyyy-MM-dd HH:mm"
                )}
              </TableCell>
              <TableCell>{organization._count.memberships}</TableCell>
              <TableCell>
                {organization.membershipByUser.membershipRole}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">{button}</div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export { OrganizationList };
