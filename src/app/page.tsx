"use client";

import Link from "next/link";
import { QrCode, ShieldCheck, Clock, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <div>
            <h1 className="text-xl font-bold">
              Absensi<span className="text-blue-400">Sholat</span>
            </h1>
          </div>

          <Link
            href="/admin"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
          >
            Admin
          </Link>
        </div>
      </nav>

      <section className="mx-auto flex min-h-[calc(100vh-81px)] max-w-6xl items-center px-5 py-16">
        <div className="grid w-full gap-12 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
              <QrCode size={17} />
              Absensi Digital
            </div>

            <h2 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
              Absensi Sholat
              <span className="block text-blue-400">
                Lebih Mudah.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              Scan QR Code, masukkan nama dan nomor absen,
              lalu lakukan absensi dengan cepat.
            </p>

            <div className="mt-8">
              <Link
                href="/absen"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 font-semibold transition hover:bg-blue-400"
              >
                Mulai Absen
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
            <Feature
              icon={<QrCode />}
              title="Scan QR"
              description="Akses halaman absensi melalui QR Code."
            />

            <Feature
              icon={<Clock />}
              title="Cepat"
              description="Proses absensi hanya membutuhkan beberapa detik."
            />

            <Feature
              icon={<ShieldCheck />}
              title="Tersimpan"
              description="Data absensi tersimpan langsung di database."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
        {icon}
      </div>

      <h3 className="font-bold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}