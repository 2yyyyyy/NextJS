import { format } from "date-fns";
import { LucideBan, LucideCheck } from "lucide-react";
import notFound from "@/app/(authenticated)/tickets/[ticketId]/not-found";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MembershipMoreMenu } from "@/features/membership/components/member-ship-more-menu";
import { MembershipDeleteButton } from "@/features/membership/components/membership-delete-button";
import { PermissionToggle } from "@/features/membership/components/permission-toggle";
import { getMemberships } from "@/features/membership/queries/get-memberships";

type MembershipListProps = {
  organizationId: string;
};

const MembershipList = async ({ organizationId }: MembershipListProps) => {
  const memberships = await getMemberships(organizationId);
  if (!memberships) {
    notFound();
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Verified Email</TableHead>
          <TableHead>JoinAt</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Can Delete Tickets</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {memberships.map((membership) => {
          const membershipMoreMenu = (
            <MembershipMoreMenu
              organizationId={membership.organizationId}
              userId={membership.userId}
              membershipRole={membership.membershipRole}
            />
          );
          const deleteButton = (
            <MembershipDeleteButton
              organizationId={membership.organizationId}
              userId={membership.userId}
            />
          );
          const button = (
            <>
              {membershipMoreMenu}
              {deleteButton}
            </>
          );
          return (
            <TableRow key={membership.userId}>
              <TableCell>{membership.user.id}</TableCell>
              <TableCell>{membership.user.username}</TableCell>
              <TableCell>{membership.user.email}</TableCell>
              <TableCell>
                {membership.user.emailVerified ? (
                  <LucideCheck />
                ) : (
                  <LucideBan />
                )}
              </TableCell>
              <TableCell>
                {format(membership.joinAt, "yyyy-MM-dd HH:mm")}
              </TableCell>
              <TableCell>{membership.membershipRole}</TableCell>
              <TableCell>
                {/* {membership.canDeleteTickets ? <LucideCheck /> : <LucideBan />} */}
                <PermissionToggle
                  userId={membership.userId}
                  organizationId={membership.organizationId}
                  permissionKey="canDeleteTicket"
                  permissionValue={membership.canDeleteTicket}
                />
              </TableCell>
              <TableCell className="flex justify-end gap-x-2">
                {button}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export { MembershipList };
