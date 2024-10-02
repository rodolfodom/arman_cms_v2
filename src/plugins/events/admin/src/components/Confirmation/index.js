import { useEffect, useState } from "react";
import { ModalLayout, ModalHeader, ModalBody, ModalFooter,Crumb } from "@strapi/design-system";

export default function Confirmation({setOpen, onClose, message}) {


  return (
    <ModalLayout
      labelledBy={"confirmation-modal"}
      onClose={onClose}
    >
      <ModalHeader closeLabel="Cerrar">
        <h2 id="confirmation-modal" style={{fontWeight: 600}}>Confirmación</h2>
      </ModalHeader>
      <ModalBody>
        <p>{message}</p>
      </ModalBody>
    </ModalLayout>
  );
}
