"use client";

import { LucideLoaderCircle } from "lucide-react";
import { cloneElement } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  label?: string;
  icon?: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
};

const SubmitButton = ({
  label,
  icon,
  variant,
  size,
  className,
  disabled,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size={size}
      className={className}
    >
      {pending ? (
        <LucideLoaderCircle className="h-4 w-4 animate-spin" />
      ) : icon ? (
        <>
          {/* @ts-expect-error 暂时忽略 */}
          {cloneElement(icon, {
            className: "size-4",
          })}
        </>
      ) : null}
      {label}
    </Button>
  );
};

export { SubmitButton };
