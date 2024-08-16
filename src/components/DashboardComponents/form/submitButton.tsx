"use client";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface FormSubmitButtonProps {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "destructive"
    | "link"
    | "secondary"
    | "ghost";
}

const SubmitButton = ({
  children,
  disabled,
  className,
  variant,
}: FormSubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      variant={variant}
      size="sm"
      className={className}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
