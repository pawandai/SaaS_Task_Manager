import { XCircle } from "lucide-react";

interface FormErrorsProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormErrors = ({ id, errors }: FormErrorsProps) => {
  return (
    <div
      className="mt-2 text-xs text-red-600"
      id={`${id}-error`}
      aria-live="polite"
    >
      {errors?.[id]?.map((error: string) => (
        <div
          key={error}
          className="flex items-center font-medium p-2 border border-red-600 bg-red-600/10 rounded-lg"
        >
          <XCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      ))}
    </div>
  );
};

export default FormErrors;
