import type { FieldError, FieldValues, UseFormRegister, FieldErrorsImpl, Merge, Path } from "react-hook-form";
import { z } from "zod";

type RHFERROR = 
  | FieldError
  | Merge<FieldError, FieldErrorsImpl>
  | undefined;

export const loginSearchSchema = z.object({
  redirect: z.string().optional(),
})

export type LoginSearch = z.infer<typeof loginSearchSchema>

const today = new Date();

export const UserEventSchema = z
  .object({
    eventDate: z
      .coerce
      .date()
      .refine((date) => date >= today, {
        message: "Date cannot be in past!",
      }),
    eventName: z
      .string()
      .min(3, "Please enter event name!"),
    venue: z
      .string()
      .min(1, "Please enter venue")
      .optional(),
    addDescription: z.boolean(),
    description: z
      .string()
      .min(5, "Description should be at least 5 characters")
      .optional(),
  })

export const UserLoginSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(8, { message: "Password too short!" })
      .max(12, { message: "Password too long!" }),
  });

export const UserSignUpSchema = z
  .object({
    ...UserLoginSchema.shape,
    userName: z
      .string()
      .min(8, "Please enter your username! (Min length: 8char"),
    getNotified: z.boolean(),
    phoneNumber: z
      .string()
      .length(10, { message: "Phone number must have exactly 10 digits!" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });


export type UserAuth = {
  id: string;
  username: string;
  email: string;
  getNotified: boolean;
  phoneNumber: string;
}

export type AuthState = {
  isAuthenticated: boolean;
  user: UserAuth | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export type StoredUserDataType = {
  id: string;
  username: string;
  email: string;
  password: string;
  getNotified: boolean;
  phoneNumber: string;
}

export type InputFieldProps<T extends FieldValues> = {
  type: string;
  name: Path<T>;
  placeholder?: string | undefined;
  register: UseFormRegister<T>;
  error?: RHFERROR; 
  style?: string | undefined;
  valueAsNumber?: boolean;
}

export type EventStore = {
  userEvents: Record<string, UserEventType[]>;
  addEvent: (userId: string, event: UserEventType) => void;
  getEvents: (userId: string) => UserEventType[];
  removeEvent: (userId: string, eventID: string) => void;
}

export type LoginValidFieldNames =
| "email"
| "password"

export type SignUpValidFieldNames =
| "email"
| "userName"
| "password"
| "confirmPassword"
| "getNotified"
| "phoneNumber"
// | "isDeveloper"
// | "exp_yrs"

export type ValidEventFieldNames =
| "eventDate"
| "eventName"
| "venue"
| "addDescription"
| "description"

export type UserLoginDataType = z.infer<typeof UserLoginSchema>

export type UserSignUpDataType = z.infer<typeof UserSignUpSchema>

export type UserEventType = z.infer<typeof UserEventSchema>

export type StoredUserEventType = UserEventType & {
  id: string;
}
