import { createFileRoute } from '@tanstack/react-router'

// import { useAuth } from '../../auth/UseAuth'
import { useNavigate } from '@tanstack/react-router'
// import { useEffect } from 'react'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})


function Dashboard() {
  const navigate = useNavigate()
  const { auth } = Route.useRouteContext()

  // useEffect(() => {
  //   if(!auth.isAuthenticated) {
  //     navigate({ to: '/home', replace: true})
  //   }
  // }, [auth.isAuthenticated, navigate])

  const handleSignOut = () => {
    auth.logout()

    navigate({ to: "/login", replace: true })
  }

  return (
    <div className="flex flex-col justify-center items-center p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Welcome back!</h2>
        <p>Hello, <strong>{auth.user?.username}</strong>!</p>
        <p>Email: {auth.user?.email}</p>
      </div>
      <div className='flex justify-center items-center mt-2'>
        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}