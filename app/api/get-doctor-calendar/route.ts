import getFreeBusy from "@/src/entities/doctors/module/getFreeBusy";
import prisma from "@/src/lib/prisma";

import { NextResponse } from "next/server";

const CALENDAR_ID =
  "6ea787ab25d3e536487dae353f743761d00c740b576c5bfe304b5228992a8a32@group.calendar.google.com";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const serviceId = searchParams.get("serviceId");
  const doctorId = searchParams.get("doctorId");
  if (!date) {
    return NextResponse.json({ error: "month is required" }, { status: 400 });
  }
  if (!serviceId) {
    return NextResponse.json(
      { error: "service id is required" },
      { status: 400 },
    );
  }
  if (!doctorId) {
    return NextResponse.json(
      { error: "doctor id is required" },
      { status: 400 },
    );
  }
  const [year, month] = date?.split("-").map(Number);
  const service = await prisma.service.findUnique({ where: { id: serviceId } });

  if (!service) {
    return Response.json({ error: "servise is not found" }, { status: 404 });
  }

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59);

  try {
    const slots = await getFreeBusy({
      timeMin: startOfMonth,
      timeMax: endOfMonth,
      doctorId: doctorId,
    });
    return NextResponse.json(slots);
  } catch (err) {
    console.error("Google Calendar API error:", err);
    return NextResponse.json(
      { error: "failed to fetch calendar data" },
      { status: 502 },
    );
  }
}
