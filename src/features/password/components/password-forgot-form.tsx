"use client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { passwordForget } from "@/features/password/action/password-forget";

const PasswordForgotForm = () => {
  const [actionState, action] = useActionState(
    passwordForget,
    EMPTY_ACTION_STATE
  );
  return (
    <Form action={action} actionState={actionState}>
      <Input
        placeholder="email"
        name="email"
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldError actionState={actionState} fieldName="email" />

      <SubmitButton label="Send Email" />
    </Form>
  );
};

export { PasswordForgotForm };
