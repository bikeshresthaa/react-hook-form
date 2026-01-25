import type { FieldError, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export const UserSignUpSchema = z
  .object({
    email: z.email(),
    userName: z
      .string()
      .min(1, "Please enter your username!"),
    // isDeveloper: z.boolean(),
    // exp_yrs: z
    //   .number()
    //   .min(1)
    //   .max(10),
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

export const UserLoginSchema = z
  .object({
    email: z.email(),
    password: z
    .string()
    .min(8, { message: "Password too short!" })
    .max(12, { message: "Password too long!" }),
  });

export type StoredUserDataType = {
  id: string;
  username: string;
  email: string;
  password: string;
}

export type UserLoginDataType = z.infer<typeof UserLoginSchema>

export type UserSignUpDataType = z.infer<typeof UserSignUpSchema>

export type FormFieldProps = {
  type: string;
  name: ValidFieldNames;
  placeholder?: string | undefined;
  register: UseFormRegister<UserSignUpDataType>;
  error?: FieldError | undefined;
  style?: string | undefined;
  valueAsNumber?: boolean;
}


export type ValidFieldNames = 
  | "email"
  | "userName"
  | "password"
  | "confirmPassword"
  // | "isDeveloper"
  // | "exp_yrs"