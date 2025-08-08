"use client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { passwordReset } from "@/features/password/action/password-reset";

type PasswordResetFormProps = {
  tokenId: string;
};

const PasswordResetForm = ({ tokenId }: PasswordResetFormProps) => {
  const [actionState, action] = useActionState(
    passwordReset.bind(null, tokenId),
    EMPTY_ACTION_STATE
  );
  return (
    <Form action={action} actionState={actionState}>
      <Input
        type="password"
        placeholder="password"
        name="password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} fieldName="password" />

      <Input
        type="password"
        placeholder="Confirm password"
        name="confirmPassword"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
      />
      <FieldError actionState={actionState} fieldName="confirmPassword" />

      <SubmitButton label="Reset Password" />
    </Form>
  );
};

export { PasswordResetForm };
