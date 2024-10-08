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
  Box,
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
  const [severity, setSeverity] = useState("");

  useEffect(() => {
    if (scannerPaused || !scannedResult) {
      return;
    }
    if (scannedResult?.data === "") {
      return;
    }
    if (selectedEvent === "") {
      setMessage(
        "Por favor seleccione un evento antes de escanear el código QR."
      );
      setScannerPaused(true);
      setOpen(true);
      return;
    } else {
      setScannerPaused(true);
      async function callRoll() {
        try {
          await adminRequests.callRoll(scannedResult.data, selectedEvent);
          setSeverity("success");
          setMessage("La asistencia ha sido confirmada con éxito.");
        } catch (error) {
          setSeverity("error");
          setMessage(
            "No se encontró la reservación. Verifique que la reservación sea correcta."
          );
        } finally {
          setOpen(true);
        }
      }
      callRoll();
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
  };

  return (
    <Main>
      <HeaderLayout
        title="Pasar lista"
        subtitle="Confirme la asitencia de los asistentes"
      />
      <Box>
        <div style={{padding: "0 1rem", maxWidth: "500px", margin: "0 auto 4rem auto"}}>
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
        <QRScanner scannerRef={scanner} onScanSuccess={setScannedResult} />
      </Box>
      {open && (
        <Confirmation
          severity={severity}
          onClose={() => {
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
