import { AlertTriangle } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="text-destructive flex w-full items-center gap-x-2 rounded-md bg-danger/15 p-3 text-sm">
      <AlertTriangle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
