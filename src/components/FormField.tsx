
import type { FieldValues } from "react-hook-form";
import type { InputFieldProps } from "../types/types";

function FormField<T extends FieldValues>({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  style,
}: InputFieldProps<T>) {
  return (
    <>
      <input
        type={type}
        className={`${style} ${error ? 'border-red-400 focus:border-red-300 focus:ring-red-300' : ''}`}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      />
      {error && typeof error.message === "string" && <span className="text-red-700 text-sm">{error.message}</span>}
    </>
  )
}
export { FormField };