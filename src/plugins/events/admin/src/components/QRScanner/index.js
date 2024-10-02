import React, { useEffect, useState, useRef } from "react";
import QrScanner from "qr-scanner";
// @ts-ignore
import QrFrame from "./assets/qr-frame.svg";
import "./QRStyles.css";

const QRScanner = ({onScanSuccess, scannerRef}) => {
  // QR States
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);

  // Fail
  const onScanFail = (err) => {
    // 🖨 Print the "err" to browser console.
    //console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scannerRef.current) {
      // 👉 Instantiate the QR Scanner
      scannerRef.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,

        returnDetailedScanResult: true,

        maxScansPerSecond: 5,
      });

      // 🚀 Start QR Scanner
      scannerRef?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scannerRef?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        "La camara no esta disponible, por favor permita el acceso a la camara."
      );
  }, [qrOn]);

  return (
    <div className="qr-reader">
      {/* QR */}
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="qr-box">
        <img
          src={QrFrame}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>
    </div>
  );
};

export default QRScanner;
