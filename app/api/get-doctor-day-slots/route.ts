import {
  NotFoundError,
  UpstreamError,
} from "@/src/features/booking/modules/errorClasses";
import { getFreeSlots } from "@/src/features/booking/modules/getFreeSlots";
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
  try {
    const res = await getFreeSlots({ date, serviceId, doctorId });
    return NextResponse.json(res);
  } catch (e) {
    if (e instanceof NotFoundError)
      return NextResponse.json({ error: e.message }, { status: 404 });
    if (e instanceof UpstreamError)
      return NextResponse.json({ error: e.message }, { status: 502 });
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
