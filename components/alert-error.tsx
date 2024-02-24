import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  text?: string;
}

export function AlertError({ title, text, ...props }: ButtonProps) {
  return (
    <Alert variant="destructive" {...props}>
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>{title || "Error"}</AlertTitle>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
}
