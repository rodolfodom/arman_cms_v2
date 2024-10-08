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


  const onScanFail = (err) => {

  };

  useEffect(() => {
    if (videoEl?.current && !scannerRef.current) {
      scannerRef.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,

        returnDetailedScanResult: true,

        maxScansPerSecond: 5,
      });

      scannerRef?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

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
          width={200}
          height={200}
          className="qr-frame"
        />
      </div>
    </div>
  );
};

export default QRScanner;
