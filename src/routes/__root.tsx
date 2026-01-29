import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import type { AuthState } from "../types/types"

interface MyRouterContext {
  auth: AuthState
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    return (
      <div className="w-full p-8">

        <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-default">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">Tan-auth</span>
            </a>
            <div className=" w-full md:w-auto" >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                <li>
                  <a href="/home" className="py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Home</a>
                </li>
                <li>
                  <a href="/login" className="py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Login</a>
                </li>
                <li>
                  <a href="/signup" className="py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Signup</a>
                </li>
                <li>
                  <a href="/dashboard" className="py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Dashboard</a>
                </li>
                <li>
                  <a href="/event" className="py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Events</a>
                </li>
          
              </ul>
            </div>
          </div>
        </nav>

        <div className="pt-10">
          <Outlet />  

        </div>

        {/* <TanStackRouterDevtools /> */}
      </div>
    )
  },
})