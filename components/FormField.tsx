
import type { FormFieldProps } from "../types";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  style,
}) => (
  <>
    <input type={type} className={style} placeholder={placeholder} {...register(name)} />
    { error && <span className="text-red-700">{error.message}</span>}
  </>
)

export default FormField;