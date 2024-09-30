/*
 *
 * HomePage
 *
 */

import React, {useEffect, useState} from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import {
  Main,
  HeaderLayout,
  Combobox,
  ComboboxOption,
  ContentLayout,
} from "@strapi/design-system";
import adminRequests from "../../api/adminRequests";
const HomePage = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const events = await adminRequests.getEvents();
      setEvents(events);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    console.log("Events:");
    console.log(events);
  }, [events]);
  return (
    <Main>
      <HeaderLayout
        title="Pasar lista"
        subtitle="Confirme la asitencia de los asistentes"
      />
      <ContentLayout>
        <Combobox
          label="Evento"
          hint="Seleccione un evento"
          placeholder="Nombre de mi conferencia"
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
      </ContentLayout>
    </Main>
  );
};

export default HomePage;
