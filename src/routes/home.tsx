import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='h-full flex justify-center items-center flex-col'>
      <h1 className="text-4xl font-bold text-gray-800">
        Hello! This is homepage!
      </h1>
      <div className='mt-10 flex flex-col items-center'>

        <p>To add events you need to login/signup then navigate to events.</p>
        <p>There you will find a form to add events and the added events will display by the side of the form!</p>
        <p>Currently you can only delete your events!</p>
        
      </div>

    </div>
  )
}
