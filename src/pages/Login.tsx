import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { UserLoginSchema } from "../types/types";
import type { UserLoginDataType } from "../types/types";
import { useAuth } from "../auth/UseAuth"
import { FormField } from "../components/FormField"
import { useForm } from 'react-hook-form'
import { useEffect } from "react";


function Login() {
  const auth = useAuth();
  const navigate = useNavigate();


  const { register, handleSubmit, formState: { errors, isValid, isSubmitted, isSubmitting }, } = useForm<UserLoginDataType>({
    resolver: zodResolver(UserLoginSchema)
  });

  useEffect(() => {
    console.log(auth.isAuthenticated)
    function checkAuth() {
      if (auth?.isAuthenticated) {
        navigate({ to: "/dashboard" })
        return null
      }
    }
    checkAuth();
  }, [auth, navigate])


  const onSubmit = async (userData: UserLoginDataType) => {
    try {
      await auth.login(userData.email, userData.password)
      navigate({ to: "/dashboard" })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-[calc(100vh - 5rem)] flex justify-center items-center bg-white p-8">
      <div className="w-full max-width-md shadow-lg rounded-md bg-white p-8 flex flex-col justify-evenly">
        <h2 className="text-center font-medium text-2xl mb-4">
          Login!
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-2">

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

          <button disabled={isSubmitting} className="flex justify-center p-2 rounded-md w-1/2 self-center bg-gray-900 text-white hover:bg-gray-800 m-4" type="submit">
            <span>Login</span>
          </button>
          <p className="flex justify-center self-center">{!isValid && isSubmitted && <span className="text-red-700">INVALID USERNAME OR PASSWORD!</span>}</p>

        </form>

      </div>
    </div>
  )
}

export default Login;