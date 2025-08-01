import { ActionState } from "@/components/form/utils/to-action-state";

type FieldErrorProps = {
  actionState: ActionState;
  fieldName: string;
};

const FieldError = ({ actionState, fieldName }: FieldErrorProps) => {
  const message = actionState.fieldErrors[fieldName]?.[0];
  return <span className="text-red-500 text-xs">{message}</span>;
};

export { FieldError };
