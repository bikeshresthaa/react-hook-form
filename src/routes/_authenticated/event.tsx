import { createFileRoute } from "@tanstack/react-router";
import useEventStore from "../../store/eventStore";
import { useShallow } from "zustand/shallow";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { UserEventSchema, type UserEventType, type StoredUserEventType } from "../../types/types";
import { FormField } from "../../components/FormField";
import { useState } from "react";

export const Route = createFileRoute('/_authenticated/event')({
  component: Event,
})

function Event() {
  const { auth } = Route.useRouteContext();
  const userID = auth.user?.id;
  const [isAddMode, setIsAddMode] = useState<boolean>(true);
  const [editEventId, setEditEventId] = useState<string | null>(null);

  const defaultValues = {
      eventDate: "",
      eventName: "",
      venue: "",
      description: "",
      addDescription: false,
    }

  const { register, handleSubmit, reset, formState: { errors, isSubmitting, }, watch, } = useForm({
    resolver: zodResolver(UserEventSchema),
    defaultValues,
  })

  const { userEvents, addEvent, removeEvent, updateEvent } = useEventStore(
    useShallow((state) => ({
      userEvents: state.userEvents,
      addEvent: state.addEvent,
      removeEvent: state.removeEvent,
      updateEvent: state.updateEvent,
    }))
  );
  const allUserEvents = userID ? (userEvents[userID] || []) : [];

  const watchAddDescription = watch("addDescription");

  const onSubmit = (eventData: UserEventType) => {

    if (!userID) {
      return
    } else {
      return isAddMode ? handleAdd(eventData) : handleEdit(eventData)
    }
  }


  const handleEdit = (eventData: UserEventType) => {
    if (userID && editEventId) {
      const updateEventData = {
        eventDate: eventData.eventDate,
        eventName: eventData.eventName,
        addDescription: eventData.addDescription,
        description: eventData.description,
        venue: eventData.venue,
      }
      updateEvent(userID, editEventId, updateEventData);
      reset(defaultValues);
    }
    setEditEventId(null);
    setIsAddMode(true);
  }

  const handleCancelEdit = () => {
    setEditEventId(null);
    setIsAddMode(true);
    reset(defaultValues);
  }

  const handleAdd = (eventData: UserEventType) => {
    const newEvent: StoredUserEventType = {
      eventID: crypto.randomUUID(),
      eventDate: eventData.eventDate,
      eventName: eventData.eventName,
      addDescription: eventData.addDescription,
      description: eventData.description,
      venue: eventData.venue,
    }
    if (userID) {
      addEvent(userID, newEvent);
      reset()
    }
  }

  const editEvent = (id: string) => {
    const eventToEdit = allUserEvents.find((event) =>
      event.eventID === id
    )

    if (eventToEdit) {
      const { eventID, ...populateEvent } = { ...eventToEdit };
      reset(populateEvent);
      setIsAddMode(false);
      setEditEventId(eventID);

    }

  }

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [isSubmitSuccessful, reset])

  return (
    <div className="min-h-[calc(100vh - 5rem)] bg-white p-1">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 md:text-4xl">Event Manager</h1>
      </div>

      <div className="grid gap-15 md:grid-cols-2 lg:grid-cols-[400px_1fr]">
        {/* left form */}
        <div className="w-full">
          <div className="sticky top-30 shadow-md border border-gray-200 rounded-md bg-white p-4 hover:shadow-lg">
            <h2 className="text-center font-medium text-2xl mb-4">{isAddMode ? "Add Events!" : "Edit Event!"}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <FormField
                type="text"
                placeholder="some event"
                name="eventName"
                style="border-2 outline-none p-2 rounded-md focus:shadow-lg hover:shadow-lg"
                register={register}
                error={errors.eventName}
              />

              <FormField
                type="date"
                name="eventDate"
                register={register}
                error={errors.eventDate}
                style="border-2 outline-none p-2 rounded-md focus:shadow-lg hover:shadow-lg"
              />

              <FormField
                type="text"
                name="venue"
                placeholder="Location of event..."
                register={register}
                error={errors.venue}
                style="border-2 outline-none p-2 rounded-md focus:shadow-lg hover:shadow-lg"
              />

              <div>
                <span className="mr-2 italic">Add some description....</span>
                <FormField
                  type="checkbox"
                  name="addDescription"
                  style="h-4 w-4 ring-gray-700 hover:shadow-md hover:ring-gray-900"
                  register={register}
                  error={errors.addDescription}
                />

                {
                  watchAddDescription === true && (

                    <FormField
                      type="textarea"
                      name="description"
                      placeholder="Event description..."
                      style="border-2 outline-none p-2 rounded-md block w-full focus:shadow-lg hover:shadow-lg"
                      register={register}
                      error={errors.description}
                    />
                  )

                }

              </div>
              <button disabled={isSubmitting} className="flex m-2 justify-center p-1.5 rounded-md w-1/2 self-center bg-gray-900 text-white hover:text-black hover:bg-gray-400/90 hover:shadow-lg" type="submit">
                <span>{isAddMode ? "Add Event" : "Edit Event"}</span>
              </button>
              {
                !isAddMode && (
                  <button
                    className="flex m-2 justify-center p-1.5 rounded-md w-1/2 self-center bg-gray-900 text-white hover:text-black hover:bg-gray-400/90 hover:shadow-lg"
                    onClick={handleCancelEdit}
                    type="button"
                  >
                    <span>Cancel</span>
                  </button>
                )
              }

            </form>
          </div>
        </div>

        {/* events on right */}
        <div className="w-full">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Upcoming Events</h2>

          {


            allUserEvents.length === 0 ? (
              <div className="rounded-lg border border-black p-8 text-center">
                <p className="text-gray-500">
                  No events yet. Add your first event!
                </p>
              </div>
            ) : (

              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {
                  allUserEvents?.filter((event) => event.eventID !== editEventId ).map((event) => {
                    return (
                      <div key={event.eventID} className="group relative border border-black rounded-md p-2 transition-all duration-300 hover:shadow-lg">
                        {/* card header */}
                        <div className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="text-lg font-semibold text-gray-700">{event.eventName}</div>

                            <button onClick={() => {
                              if (!userID) {
                                return
                              }
                              removeEvent(userID, event.eventID)
                            }} className="h-8 w-8 text-gray-900 opacity-0 transition-opacity hover:text-gray-900 group-hover:opacity-100"><svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                            </button>
                            <button onClick={() => {
                              editEvent(event.eventID)
                            }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
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
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                              </svg>

                              <span>{event.venue}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                              </svg>

                              <span>{new Date(event.eventDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>

                            </div>
                          </div>
                        </div>

                      </div>
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


