import { useEffect, useRef } from "react";
import { ActionState } from "@/components/form/utils/to-action-state";

type OnArgs = {
  actionState: ActionState;
};

type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions
) => {
  const prevTimestamp = useRef(actionState.timestamp);
  const isUpdate = prevTimestamp.current !== actionState.timestamp;

  useEffect(() => {
    if (!isUpdate) {
      return;
    }
    prevTimestamp.current = actionState.timestamp;
    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    } else {
      options.onError?.({ actionState });
    }
  }, [actionState, options, isUpdate]);
};

export { useActionFeedback };
