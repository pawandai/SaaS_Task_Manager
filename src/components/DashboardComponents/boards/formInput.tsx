"use client";

import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

interface IFormInputProps {
  errors?: {
    title?: string[];
  };
}

const FormInput = ({ errors }: IFormInputProps) => {
  const { pending } = useFormStatus();

  return (
    <div>
      <Input
        id="title"
        name="title"
        required
        placeholder="Enter a board title"
        disabled={pending}
      />
      {errors?.title ? (
        <div>
          {errors.title.map((error: string) => (
            <p key={error} className="text-rose-600">
              {error}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FormInput;
