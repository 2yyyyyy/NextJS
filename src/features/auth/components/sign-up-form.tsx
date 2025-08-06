"use client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signUp } from "@/features/auth/action/sign-up";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Input
        placeholder="username"
        name="username"
        defaultValue={actionState.payload?.get("username") as string}
      />
      <FieldError actionState={actionState} fieldName="username" />

      <Input
        placeholder="email"
        name="email"
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldError actionState={actionState} fieldName="email" />

      <Input
        placeholder="password"
        name="password"
        type="password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} fieldName="password" />

      <Input
        placeholder="confirm password"
        name="confirmPassword"
        type="password"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
      />
      <FieldError actionState={actionState} fieldName="confirmPassword" />
      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export { SignUpForm };
