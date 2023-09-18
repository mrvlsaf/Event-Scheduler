import axios from "axios";
import React, { useContext, useState, useEffect, createContext } from "react";

const EventsContext = createContext();

export function EventsContextProvider({ children }) {
  const [eventsData, setEventsData] = useState([])

  useEffect(() => {
    axios.get("/api/events").then((response) => {
      setEventsData(response.data.events);
    }).catch((error) => {
      console.error(error)
    })
  }, []);

  return (
    <EventsContext.Provider
      value={{
        eventsData,
        setEventsData,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEventsContext() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}