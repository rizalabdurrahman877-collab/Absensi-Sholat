"use client";

import { QRCodeCanvas } from "qrcode.react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export default function QRPage() {
  const getUrl = () => {
    if (typeof window === "undefined") {
      return "";
    }

    return `${window.location.origin}/absen`;
  };

  function downloadQR() {
    const canvas = document.querySelector(
      "canvas"
    ) as HTMLCanvasElement;

    if (!canvas) return;

    const link = document.createElement("a");

    link.download = "qr-absensi-sholat.png";
    link.href = canvas.toDataURL("image/png");

    link.click();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
      <div className="w-full max-w-md text-center">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={16} />
          Kembali
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white p-8 text-slate-900 shadow-2xl">
          <h1 className="text-2xl font-black">
            QR ABSENSI
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Scan QR Code untuk melakukan absensi
          </p>

          <div className="mt-8 flex justify-center">
            <QRCodeCanvas
              value={getUrl()}
              size={240}
              level="H"
            />
          </div>

          <p className="mt-6 break-all text-xs text-slate-500">
            {getUrl()}
          </p>

          <button
            onClick={downloadQR}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white hover:bg-slate-800"
          >
            <Download size={18} />
            Download QR
          </button>
        </div>
      </div>
    </main>
  );
}