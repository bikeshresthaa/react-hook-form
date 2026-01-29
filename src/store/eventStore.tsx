import { create } from "zustand"
import type { EventStore } from "../types/types"
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const useEventStore = create(
  devtools(
    persist<EventStore>(
      (set) => ({
        userEvents: {},
        updateEvent: (userID, eventID, updatedEvent) => {
          set((state) => ({
            userEvents: { ...state.userEvents, [userID]: state.userEvents[userID].map((event) => 
              event.eventID === eventID ? {...event, ...updatedEvent} : event
            )}
          }))
        },
        addEvent: (userID, event) => {
          set((state) => ({
            userEvents: { ...state.userEvents, [userID]: [...(state.userEvents[userID] || []), event] }
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