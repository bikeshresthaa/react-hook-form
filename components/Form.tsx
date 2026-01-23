import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import FormField from "./FormField";
import type { FormData } from "../types";



function SimpleInput() {
  const { register, handleSubmit, formState: { touchedFields, isDirty, isValid, isSubmitted, dirtyFields, errors }, watch } = useForm<FormData>({
    defaultValues: {
      userName: "",
      email: "",
      isDeveloper: false,
      exp_yrs: undefined,
    },
  });
  const [data, setData] = useState<FormData | null>(null);
  const watchIsDeveloper = watch("isDeveloper");

  const onSubmit: SubmitHandler<FormData> = (values) => {
    setData(values);
  }


  return (
    <div className="w-full flex justify-center items-center bg-gray-900 p-8 border-r border-dashed">
      <div className="w-1/2 shadow-lg rounded-md bg-white p-8 flex flex-col" style={{height:'600px'}}>
        <h2 className="text-center font-medium text-2xl mb-4">
          React Hook Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col justify-evenly">
          <FormField 
            type="userName"
            placeholder="some_user12"
            name="userName"
            style="border-2 outline-none p-2 rounded-md"
            register={register}
            error={errors.userName}
          />


          <FormField 
            type="email"
            placeholder="something@bikesh.com"
            name="email"
            register={register}
            style="border-2 outline-none p-2 rounded-md"
            error={errors.email}
          />

          <div>
            <span className="mr-2">Are you a developer?</span>
            <FormField
              type="checkbox"
              name="isDeveloper"
              register={register}
            />
          </div>

          {
            watchIsDeveloper ? 
              <div className="flex w-full">
                <FormField 
                  type="number"
                  style="flex-1 border-2 outline-none p-2 rounded-md mr-2"
                  placeholder="Experience in years.. (1 - 10)"
                  name="exp_yrs"
                  register={register}
                  error={errors.exp_yrs}
                />
              </div>
              : null
          }

         
  
          <button className="flex justify-center p-2 rounded-md w-1/2 self-center bg-gray-900 text-white hover:bg-gray-800 m-4" type="submit">
            <span>Submit</span>
          </button>
        </form>
        <div className="border-2 rounded-md outline-none">
          <p><strong>Data: </strong> {JSON.stringify(data)}</p>
          <p><strong>Valid?: </strong> {JSON.stringify(isValid)}</p>
          <p><strong>Touched fields: </strong> {JSON.stringify(touchedFields)}</p>
          <p><strong>isDirty?: </strong> {JSON.stringify(isDirty)}</p>
          <p><strong>Dirty fields: </strong> {JSON.stringify(dirtyFields)}</p>
          <p><strong>Errors: </strong> {JSON.stringify(errors?.email?.message)}</p>
          <p><strong>Is submitted?: </strong> {JSON.stringify(isSubmitted)}</p>
        </div>
      </div>
    </div>
  )
}

export default SimpleInput;