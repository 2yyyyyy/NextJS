import { toast, ToastT } from "sonner";
import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import { ActionState } from "@/components/form/utils/to-action-state";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children: React.ReactNode;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
  toastOption?: Omit<ToastT, "id"> | undefined;
};

const Form = ({
  action,
  actionState,
  children,
  onSuccess,
  onError,
  toastOption,
}: FormProps) => {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message, toastOption);
      }
      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message, toastOption);
      }
      onError?.(actionState);
    },
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
};

export { Form };
