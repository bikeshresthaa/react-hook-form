import { createFileRoute } from "@tanstack/react-router";
import useEventStore from "../../store/eventStore";
import { useShallow } from "zustand/shallow";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { UserEventSchema, type StoredUserEventType, type UserEventType } from "../../types/types";
import { FormField } from "../../components/FormField";

export const Route = createFileRoute('/_authenticated/event')({
  component: Event,
})

function Event(){
  const { auth } = Route.useRouteContext();
  
  const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitted, isSubmitting, }, watch, } = useForm({
    resolver: zodResolver(UserEventSchema)
  })
  
  const { addEvent, getEvents, deleteEvent } = useEventStore(
    useShallow((state) => ({
      addEvent: state.addEvent,
      getEvents: state.getEvents,
      removeEvent: state.removeEvent,
    }))
  );
  
  const watchAddDescription = watch("addDescription");

  const onSubmit = (eventData: UserEventType) => {
    const userID = auth.user?.id
    if(!userID) {
      return
    }
    const newEvent: StoredUserEventType = {
      id: crypto.randomUUID(),
      eventDate: eventData.eventDate,
      eventName: eventData.eventName,
      addDescription: eventData.addDescription,
      description: eventData.description,
      venue: eventData.venue,
    }
    addEvent(userID, newEvent);
    reset();
  }

  return (
    <div className="min-h-[calc(100vh - 5rem)] flex justify-center items-center bg-white p-8">
      <div className="flex justify-center items-center bg-white p-4">
        <div className="w-full max-w-md shadow-lg rounded-md bg-white p-8 flex flex-col justify-evenly">
          <h2 className="text-center font-medium text-2xl mb-4">Add Events!</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-2">
            <FormField 
              type="text"
              placeholder="some event"
              name="eventName"
              style="border-2 outline-none p-2 rounded-md"
              register={register}
              error={errors.eventName}
            />

            <FormField 
              type="date"
              name="eventDate"
              register={register}
              error={errors.eventDate}
              style="border-2 outline-none p-2 rounded-md"
            />

            <FormField 
              type="text"
              name="venue"
              placeholder="Location of event..."
              register={register}
              error={errors.venue}
              style="border-2 outline-none p-2 rounded-md"
            />

            <div>
              <span className="mr-2">Add some description....</span>
              <FormField 
                type="checkbox"
                name="addDescription"
                register={register}
                error={errors.addDescription}
              />

              {
                watchAddDescription ?

                  <FormField 
                    type="textarea"
                    name="description"
                    placeholder="Event description..."
                    style="border-2 outline-none p-2 rounded-md block"
                    register={register}
                    error={errors.description}
                  />

                  : null
              }

              <button disabled={isSubmitting} className="flex m-2 justify-center p-1.5 rounded-md w-1/2 self-center bg-gray-900 text-white hover:bg-gray-800" type="submit">
                <span>Add Event</span>
              </button>
              <p className="flex justify-center self-center">{!isValid && isSubmitted && <span className="text-red-700">Invalid Entry!</span>}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )




}


