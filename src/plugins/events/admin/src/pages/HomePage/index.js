/*
 *
 * HomePage
 *
 */

import React, { useEffect, useRef, useState } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import QRScanner from "../../components/QRScanner";

import {
  Main,
  HeaderLayout,
  Combobox,
  ComboboxOption,
  ContentLayout,
} from "@strapi/design-system";
import adminRequests from "../../api/adminRequests";
import Confirmation from "../../components/Confirmation";
const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [scannedResult, setScannedResult] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [open, setOpen] = useState(false);
  const scanner = useRef(null);
  const [scannerPaused, setScannerPaused] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if(scannerPaused || !scannedResult) {
      console.log("Scanner paused");
      return;
    }

    if(scannedResult?.data === "") {
      return;
    }

    if(selectedEvent === "") {
      setMessage("Por favor seleccione un evento antes de escanear el código QR.");
      setScannerPaused(true);
      setOpen(true);
      return;
    }else{
      setMessage("El código QR ha sido escaneado con éxito.");
      setScannerPaused(true);
      setOpen(true);
    }

  }, [scannedResult]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await adminRequests.getEvents();
      setEvents(events);
    };
    fetchEvents();
  }, []);

  const onEventSelectChange = (event) => {
    setSelectedEvent(event);
  }

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
        <QRScanner scannerRef={scanner} onScanSuccess={setScannedResult} />
      </ContentLayout>
      {open && (
        <Confirmation
          setOpen={setOpen}
          onClose={() => {
            console.log("Se ha cerrado la confirmación");
            setScannerPaused(false);
            setOpen(false);
          }}
          message={message}
        />
      )}
    </Main>
  );
};

export default HomePage;
