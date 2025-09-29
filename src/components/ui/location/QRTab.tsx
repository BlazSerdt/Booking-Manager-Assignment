import { QRCodeSVG } from "qrcode.react";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import type {QRTabProps} from "../../../types";

export const QRTab = ({ qrCodeValue }: QRTabProps) => {
  return (
    <div className="p-6 flex justify-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <QRCodeSVG value={qrCodeValue} size={200} />
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
          onClick={() => {}}
        />
      </div>
    </div>
  );
}