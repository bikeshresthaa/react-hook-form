import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='h-full flex justify-center items-center flex-col'>
      <h1 className="text-4xl font-bold text-gray-800">
        Hello! this is homepage!
      </h1>
      <p className='text-blue-500'>Login/Signup to continue!</p>

    </div>
  )
}
