import type { FieldError, UseFormRegister } from "react-hook-form";

export type FormData = {
  email: string;
  userName: string;
  isDeveloper: boolean;
  exp_yrs: number;
}

export type FormFieldProps = {
  type: string;
  name: ValidFieldNames;
  placeholder?: string | undefined;
  register: UseFormRegister<FormData>;
  error?: FieldError | undefined;
  style?: string | undefined;
}


export type ValidFieldNames = 
  | "email"
  | "userName"
  | "isDeveloper"
  | "exp_yrs"