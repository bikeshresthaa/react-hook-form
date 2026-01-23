import type { FieldError, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export const UserSchema = z
  .object({
    email: z.email(),
    userName: z.string(),
    isDeveloper: z.boolean(),
    exp_yrs: z
      .number()
      .min(1)
      .max(10),
    password: z
      .string()
      .min(8, { message: "Password too short!"})
      .max(12, { message: "Password too long!" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

export type FormData = z.infer<typeof UserSchema>

export type FormFieldProps = {
  type: string;
  name: ValidFieldNames;
  placeholder?: string | undefined;
  register: UseFormRegister<FormData>;
  error?: FieldError | undefined;
  style?: string | undefined;
  valueAsNumber?: boolean;
}


export type ValidFieldNames = 
  | "email"
  | "userName"
  | "isDeveloper"
  | "exp_yrs"
  | "password"
  | "confirmPassword"