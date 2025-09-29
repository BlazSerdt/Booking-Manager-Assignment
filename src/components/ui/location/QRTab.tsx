import { QRCodeCanvas } from "qrcode.react";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import type { QRTabProps } from "../../../types";
import { useRef } from "react";

export const QRTab = ({ qrCodeValue, locationName }: QRTabProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = () => {
    if (!canvasRef.current) return;

    const url = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = url;
    link.download = `${locationName}-QR.png`;
    link.click();
  };

  return (
    <div className="p-6 flex justify-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <QRCodeCanvas ref={canvasRef} value={qrCodeValue} size={200} />
        <small className="text-center">
          Scan this QR code with your device.
        </small>
      </div>

      <Divider layout="vertical" />

      <div className="flex flex-col gap-2 max-w-[300px]">
        <h3 className="text-lg font-semibold">Share Your Location</h3>
        <p className="text-justify mb-4">
          You can scan the QR code with your mobile device to quickly access this location,
          or download it to share or print.
        </p>
        <Button
          label="Download QR"
          icon="pi pi-download"
          onClick={handleDownload}
        />
      </div>
    </div>
  );
}