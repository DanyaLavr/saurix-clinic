import getDoctorService from "@/src/entities/doctors/module/getDoctorService";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get("doctorId");
  if (!doctorId)
    return NextResponse.json(
      { error: "doctor's id is required" },
      { status: 400 },
    );

  const data = await getDoctorService(doctorId);
  return NextResponse.json(data);
}
