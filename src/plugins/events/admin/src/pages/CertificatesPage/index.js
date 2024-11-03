/*
 *
 * HomePage
 *
 */

import React, { useEffect, useRef, useState } from "react";

import {
  Main,
  HeaderLayout,
  Combobox,
  ComboboxOption,
  ContentLayout,
  Box,
} from "@strapi/design-system";
import adminRequests from "../../api/adminRequests";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await adminRequests.getEvents();
      setEvents(events);
    };
    fetchEvents();
  }, []);

  const onEventSelectChange = (event) => {
    setSelectedEvent(event);
  };

  return (
    <Main>
      <HeaderLayout
        title="Certificados"
        subtitle="Generre los certificados de asistencia para sus participantes"
      />
      <ContentLayout>
        <div
          style={{
            padding: "0 1rem",
            maxWidth: "500px",
            margin: "0 auto 4rem auto",
          }}
        >
          <Combobox
            label="Evento"
            hint="Seleccione un evento"
            placeholder="Nombre de mi conferencia"
            onChange={onEventSelectChange}
            value={selectedEvent}
          >
            {events.length === 0 ? (
              <ComboboxOption disabled value="">
                No hay eventos disponibles
              </ComboboxOption>
            ) : (
              events.map((event) => (
                <ComboboxOption key={event.id} value={event.id}>
                  {event.Name}
                </ComboboxOption>
              ))
            )}
          </Combobox>
        </div>
      </ContentLayout>
    </Main>
  );
};

export default HomePage;
