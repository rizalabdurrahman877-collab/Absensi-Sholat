import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { nama, no_absen } = body;

    if (!nama || !no_absen) {
      return NextResponse.json(
        {
          success: false,
          message: "Nama dan nomor absen wajib diisi.",
        },
        { status: 400 }
      );
    }

    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("absensi")
      .insert([
        {
          nama: nama.trim(),
          no_absen: Number(no_absen),
          tanggal: today,
        },
      ])
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          {
            success: false,
            message: "Nomor absen tersebut sudah melakukan absensi hari ini.",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Absensi berhasil.",
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server.",
      },
      { status: 500 }
    );
  }
}