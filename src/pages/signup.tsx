// import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import FormField from "../components/FormField";
import type { UserSignUpDataType, StoredUserDataType } from "../types/types";
import { UserSignUpSchema } from "../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";



function SimpleInput() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isValid, isSubmitted, isSubmitting }, setError, } = useForm<UserSignUpDataType>({
    resolver: zodResolver(UserSignUpSchema),
  });
  // const [data, setData] = useState<UserSignUpDataType | null>(null);
  // const watchIsDeveloper = watch("isDeveloper");

  const onSubmit: SubmitHandler<UserSignUpDataType> = async (userData: UserSignUpDataType) => {
    const rawUserData = localStorage.getItem('users')
    const users: StoredUserDataType[] = rawUserData ? JSON.parse(rawUserData) : []

    const userExists = users.some((user) => user.email === userData.email)

    if(userExists) {
      setError('email', {
        message: 'User with this email already exists',
      })
      return
    }

    const newUser: StoredUserDataType = {
      id: crypto.randomUUID(),
      username: userData.userName,
      email: userData.email,
      password: userData.password,
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    navigate({ to: '/login' })
  }


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 p-8 border-r border-dashed">
      <div className="w-1/2 shadow-lg rounded-md bg-white p-8 flex flex-col justify-evenly">
        <h2 className="text-center font-medium text-2xl mb-4">
          Sign Up!
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

          {/* <div>
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
          } */}

         
  
          <button disabled={isSubmitting} className="flex justify-center p-2 rounded-md w-1/2 self-center bg-gray-900 text-white hover:bg-gray-800 m-4" type="submit">
            <span>Sign up</span>
          </button>
          <p className="flex justify-center self-center">{!isValid && isSubmitted && <span className="text-red-700">INVALID INPUT!</span>}</p>
        </form>
      
      </div>
    </div>
  )
}

export default SimpleInput;