
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
} from "@strapi/design-system";
import "./styles.css";

export default function Confirmation({ onClose, message, severity }) {
  return (
    <ModalLayout
      labelledBy={"confirmation-modal"}
      onClose={onClose}
      className="modal-layout"
    >
      <ModalHeader closeLabel="Cerrar">
        <h2
          id="confirmation-modal"
          style={{
            fontWeight: 600,
            color:
              severity === "error"
                ? "red"
                : severity === "success"
                ? "green"
                : "blue",
          }}
        >
          {severity === "success"
            ? "Confirmación"
            : severity === "error"
            ? "Ocurrió un error"
            : "Información"}
        </h2>
      </ModalHeader>
      <ModalBody>
        <p>{message}</p>
      </ModalBody>
    </ModalLayout>
  );
}
