"use client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { emailVerification } from "@/features/auth/action/email-verification";

const EmailVerificationForm = () => {
  const [actionState, action] = useActionState(
    emailVerification,
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        placeholder="Code"
        name="code"
        defaultValue={actionState.payload?.get("code") as string}
      />
      <FieldError actionState={actionState} fieldName="code" />

      <SubmitButton label="Verify Email" />
    </Form>
  );
};

export { EmailVerificationForm };
