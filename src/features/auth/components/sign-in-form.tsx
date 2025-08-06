"use client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signIn } from "@/features/auth/action/sign-in";

const SignInForm = () => {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
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

      <SubmitButton label="Sign In" />
    </Form>
  );
};

export { SignInForm };
