import { create } from "zustand"
import type { EventStore } from "../types/types"
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const useEventStore = create(
  devtools(
    persist<EventStore>(
      (set, get) => ({
        userEvents: {},
        addEvent: (userID, event) => {
          set((state) => ({
            userEvents: { ...state.userEvents, [userID]: [...(state.userEvents[userID] || []), event] }
          }));
        },
        getEvents: (userID) => {
          const currentUserEvents = get().userEvents[userID] || []
          return currentUserEvents.map((event) => ({
            ...event,
            eventDate: new Date(event.eventDate),
          }));
        },
        removeEvent: (userID, eventID) => {
          set((state) => ({
            userEvents: {
              ...state.userEvents,
              [userID]: [...(state.userEvents[userID] || [])
                .filter(
                  (e) => e.eventID !== eventID
                )]
            }
          }))
        },
      }),
      {
        name: "events",
        storage: createJSONStorage(() => sessionStorage)
      })
  )
);

export default useEventStore;