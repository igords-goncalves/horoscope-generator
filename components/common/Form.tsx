import { ReactNode } from "react";

type FormProps = {
  children: ReactNode;
  onSubmit?: () => Promise<void>;
  role?: string;
};

const Form = ({ children, onSubmit, role }: FormProps) => {
  return (
    <form
      className="flex flex-col gap-6 w-full"
      role={role}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
