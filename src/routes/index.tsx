import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='min-h-[calc(100vh - 5rem)] flex flex-col justify-center items-center p-8 shadow-md rounded-md w-full'>
      <h1>Hello Welcome to Tanstack router Demo</h1>
      <p>Please <span className='text-blue-500'>login</span> or <span className='text-blue-500'>signup</span> to continue!</p>
    </div>
  )
}
