"use client";

import { QRCodeSVG } from "qrcode.react";

export function QrCard({ url }: { url: string }) {
  return (
    <QRCodeSVG
      value={url}
      size={512}
      level="M"
      marginSize={0}
      fgColor="#14141A"
      bgColor="#ffffff"
      title={`Código QR hacia ${url}`}
      className="h-auto w-full"
    />
  );
}
