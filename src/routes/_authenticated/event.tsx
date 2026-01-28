import { createFileRoute } from "@tanstack/react-router";
import useEventStore from "../../store/eventStore";
import { useShallow } from "zustand/shallow";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { UserEventSchema, type UserEventType, type StoredUserEventType } from "../../types/types";
import { FormField } from "../../components/FormField";

export const Route = createFileRoute('/_authenticated/event')({
  component: Event,
})

function Event() {
  const { auth } = Route.useRouteContext();
  const userID = auth.user?.id

  const { register, handleSubmit, reset, formState: { errors, isSubmitting, }, watch, } = useForm({
    resolver: zodResolver(UserEventSchema)
  })

  const { addEvent, getEvents, removeEvent } = useEventStore(
    useShallow((state) => ({
      addEvent: state.addEvent,
      getEvents: state.getEvents,
      removeEvent: state.removeEvent,
    }))
  );

  const userEvents = userID ? getEvents(userID) : [];

  const watchAddDescription = watch("addDescription");

  const onSubmit = (eventData: UserEventType) => {

    if (!userID) {
      return
    }
    const newEvent: StoredUserEventType = {
      eventID: crypto.randomUUID(),
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
    <div className="min-h-[calc(100vh - 5rem)] bg-white p-1">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 md:text-4xl">Event Manager</h1>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[500px_1fr]">
        {/* left form */} 
        <div className="w-full">
          <div className="shadow-lg border border-gray-200 rounded-md bg-white p-4">
            <h2 className="text-center font-medium text-2xl mb-2">Add Events!</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
              </div>
            </form>
          </div>
        </div>

        {/* events on right */}
        <div className="w-full">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Upcoming Events</h2>

          {
            userEvents.length === 0 ? (
              <div className="rounded-lg border border-black p-8 text-center">
                <p className="text-gray-500">
                  No events yet. Add your first event!
                </p>
              </div>
            ) : (

              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {
                  userEvents?.map((event) => {
                    return (
                      <div key={event.eventID} className="group relative border border-black rounded-md p-2 transition-all hover-shadow-lg">
                        {/* card header */}
                        <div className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="text-lg font-semibold text-gray-900">{event.eventName}</div>

                            <button onClick={() => {
                              if(!userID) {
                                return
                              }
                              removeEvent(userID, event.eventID)
                            }} className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"><svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            </button>
                          </div>
                        </div>

                        {/* card content */}
                        <div className="space-y-3">
                          {
                            event.description && (
                              <p className="text-small">{event.description}</p>
                            )
                          }
                          <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                              </svg>

                              <span>{event.venue}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                              </svg>

                              <span>{event.eventDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>

                            </div>
                          </div>
                        </div>

                      </div>

                      // <div key={event.eventID} className="bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
                      //   <h5 className="mb-2 text-xl font-semibold">{event.eventName}</h5>
                      //   <span className="flex flex-wrap gap-2 mb-2">
                      //     {event.venue}
                      //   </span>
                      //   <span className="inline-flex items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-sm px-2 py-1 rounded">
                      //     {event.eventDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      //   </span>
                      //   <p className="text-body mb-4">{event.description}</p>
                      //   <button type="button" onClick={() => {
                      //     if (!userID) {
                      //       return
                      //     }
                      //     removeEvent(userID, event.eventID)
                      //   }} className="text-white bg-red-800 hover:bg-red-900 rounded-base text-sm px-4 py-2">Remove</button>
                      // </div>
                    )
                  })
                }

              </div>
            )
          }


        </div>
      </div>




    </div>
  )




}


