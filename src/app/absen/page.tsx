"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, QrCode } from "lucide-react";
import { supabase } from "@/app/lib/supabase";

export default function AbsenPage() {
  const [nama, setNama] = useState("");
  const [noAbsen, setNoAbsen] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!nama.trim()) {
      setError("Nama wajib diisi.");
      return;
    }

    if (!noAbsen) {
      setError("Nomor absen wajib diisi.");
      return;
    }

    setLoading(true);

    const today = new Date().toISOString().split("T")[0];

    const { error: insertError } = await supabase.from("absensi").insert({
      nama: nama.trim(),
      no_absen: Number(noAbsen),
      tanggal: today,
    });

    setLoading(false);

    if (insertError) {
      if (insertError.code === "23505") {
        setError("Nomor absen tersebut sudah melakukan absensi hari ini.");
      } else {
        setError("Gagal menyimpan absensi. Silakan coba lagi.");
      }

      return;
    }

    setSuccess(true);
    setNama("");
    setNoAbsen("");
  }

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
            <CheckCircle2 size={45} className="text-emerald-400" />
          </div>

          <h1 className="text-3xl font-bold">Absensi Berhasil!</h1>

          <p className="mt-3 text-slate-400">
            Data absensi kamu sudah berhasil tersimpan.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-blue-500 px-8 py-3 font-semibold transition hover:bg-blue-400"
          >
            Kembali
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 py-10 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
            <QrCode size={32} className="text-blue-400" />
          </div>

          <h1 className="text-3xl font-black">Absensi Sholat</h1>

          <p className="mt-2 text-slate-400">
            Silakan isi data untuk melakukan absensi
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl sm:p-8"
        >
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Nama
              </label>

              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-blue-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                No. Absen
              </label>

              <input
                type="number"
                min="1"
                value={noAbsen}
                onChange={(e) => setNoAbsen(e.target.value)}
                placeholder="Masukkan nomor absen"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-blue-400"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 py-3.5 font-bold transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "ABSEN SEKARANG"
              )}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-slate-600">
          Sistem Absensi Digital
        </p>
      </div>
    </main>
  );
}
