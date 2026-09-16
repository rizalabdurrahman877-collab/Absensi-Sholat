"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  RefreshCw,
  Trash2,
  Users,
} from "lucide-react";
import { supabase } from "@/app/lib/supabase";

type Absensi = {
  id: number;
  nama: string;
  no_absen: number;
  waktu_absen: string;
  tanggal: string;
};

export default function AdminPage() {
  const [data, setData] = useState<Absensi[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);

    const { data, error } = await supabase
      .from("absensi")
      .select("*")
      .order("waktu_absen", {
        ascending: false,
      });

    if (!error) {
      setData(data || []);
    }

    setLoading(false);
  }

  async function deleteData(id: number) {
    const yakin = confirm(
      "Yakin ingin menghapus data absensi ini?"
    );

    if (!yakin) return;

    await supabase
      .from("absensi")
      .delete()
      .eq("id", id);

    loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const todayData = data.filter(
    (item) => item.tanggal === today
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <div>
            <h1 className="text-xl font-bold">
              Admin<span className="text-blue-400">Absensi</span>
            </h1>
            <p className="text-xs text-slate-500">
              Dashboard
            </p>
          </div>

          <button
            onClick={loadData}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <h2 className="text-3xl font-black">
          Dashboard
        </h2>

        <p className="mt-2 text-slate-400">
          Pantau data absensi siswa.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat
            icon={<Users />}
            title="Total Absensi"
            value={data.length}
          />

          <Stat
            icon={<CheckCircle2 />}
            title="Hari Ini"
            value={todayData.length}
          />

          <Stat
            icon={<CalendarDays />}
            title="Tanggal"
            value={new Date().toLocaleDateString(
              "id-ID"
            )}
          />
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 px-5 py-4">
            <h3 className="font-bold">
              Riwayat Absensi
            </h3>
          </div>

          {loading ? (
            <div className="p-10 text-center text-slate-500">
              Memuat data...
            </div>
          ) : data.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              Belum ada data absensi.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-white/[0.03] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">
                      No
                    </th>
                    <th className="px-5 py-4">
                      Nama
                    </th>
                    <th className="px-5 py-4">
                      No. Absen
                    </th>
                    <th className="px-5 py-4">
                      Tanggal
                    </th>
                    <th className="px-5 py-4">
                      Waktu
                    </th>
                    <th className="px-5 py-4">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-t border-white/5"
                    >
                      <td className="px-5 py-4 text-slate-500">
                        {index + 1}
                      </td>

                      <td className="px-5 py-4 font-medium">
                        {item.nama}
                      </td>

                      <td className="px-5 py-4">
                        {item.no_absen}
                      </td>

                      <td className="px-5 py-4 text-slate-400">
                        {new Date(
                          item.tanggal
                        ).toLocaleDateString(
                          "id-ID"
                        )}
                      </td>

                      <td className="px-5 py-4 text-slate-400">
                        {new Date(
                          item.waktu_absen
                        ).toLocaleTimeString(
                          "id-ID"
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <button
                          onClick={() =>
                            deleteData(item.id)
                          }
                          className="rounded-lg p-2 text-red-400 hover:bg-red-400/10"
                        >
                          <Trash2 size={17} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Stat({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          {icon}
        </div>
      </div>

      <p className="mt-5 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>
    </div>
  );
}