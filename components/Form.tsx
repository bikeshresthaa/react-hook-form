import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import FormField from "./FormField";
import type { FormData } from "../types";
import { UserSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";


function SimpleInput() {
  const { register, handleSubmit, formState: { errors, isValid, isSubmitted }, watch, } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  });
  const [data, setData] = useState<FormData | null>(null);
  const watchIsDeveloper = watch("isDeveloper");

  const onSubmit: SubmitHandler<FormData> = (values) => {
    setData(values);
    console.log(data);
  }


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 p-8 border-r border-dashed">
      <div className="w-1/2 shadow-lg rounded-md bg-white p-8 flex flex-col justify-evenly">
        <h2 className="text-center font-medium text-2xl mb-4">
          React Hook Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-2">
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

          <FormField 
            type="password"
            placeholder="Password"
            name="password"
            style="border-2 outline-none p-2 rounded-md"
            register={register}
            error={errors.password}
          />

          <FormField 
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            style="border-2 outline-none p-2 rounded-md"
            register={register}
            error={errors.confirmPassword}
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
                  valueAsNumber
                />
              </div>
              : null
          }

         
  
          <button className="flex justify-center p-2 rounded-md w-1/2 self-center bg-gray-900 text-white hover:bg-gray-800 m-4" type="submit">
            <span>Submit</span>
          </button>
          <p className="flex justify-center self-center">{!isValid && isSubmitted && <span className="text-red-700">INVALID INPUT!</span>}</p>
        </form>
      
      </div>
    </div>
  )
}

export default SimpleInput;