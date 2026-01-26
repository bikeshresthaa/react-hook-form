
import type { SignUpFormFieldProps, LoginFormFieldProps } from "../types/types";

const SignUpFormField: React.FC<SignUpFormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  style,
}) => (
  <>
    <input type={type} className={style} placeholder={placeholder} {...register(name, {valueAsNumber})} />
    { error && <span className="text-red-700">{error.message}</span>}
  </>
)

const LogInFormField: React.FC<LoginFormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  style,
}) => (
  <>
    <input type={type} className={style} placeholder={placeholder} {...register(name, {valueAsNumber})} />
    { error && <span className="text-red-700">{error.message}</span>}
  </>
)

export { SignUpFormField, LogInFormField };