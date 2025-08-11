"use client";
import { useActionState } from "react";
import { Form } from "@/components/form/form";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { switchOrganization } from "@/features/organization/action/switch-organization";

type OrganizetionSwitchButtonProps = {
  organizationId: string;
  trigger: React.ReactNode;
};
const OrganizetionSwitchButton = ({
  organizationId,
  trigger,
}: OrganizetionSwitchButtonProps) => {
  const [actionState, action] = useActionState(
    switchOrganization.bind(null, organizationId),
    EMPTY_ACTION_STATE
  );
  return (
    <Form action={action} actionState={actionState}>
      {trigger}
    </Form>
  );
};

export { OrganizetionSwitchButton };
