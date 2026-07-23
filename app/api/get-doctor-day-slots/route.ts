import getFreeBusy from "@/src/entities/doctors/module/getFreeBusy";
import generateFreeSlots from "@/src/features/booking/modules/generateFreeSlots";
import generateSlots from "@/src/features/booking/modules/generateSlots";
import prisma from "@/src/lib/prisma";

const CALENDAR_ID =
  "6ea787ab25d3e536487dae353f743761d00c740b576c5bfe304b5228992a8a32@group.calendar.google.com";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const serviceId = searchParams.get("serviceId");
  const doctorId = searchParams.get("doctorId");

  if (!date) {
    return Response.json({ error: "month is required" }, { status: 400 });
  }
  if (!serviceId) {
    return Response.json({ error: "service id is required" }, { status: 400 });
  }
  if (!doctorId) {
    return Response.json({ error: "doctor id is required" }, { status: 400 });
  }

  const service = await prisma.service.findUnique({ where: { id: serviceId } });

  if (!service) {
    return Response.json({ error: "servise is not found" }, { status: 404 });
  }

  const [year, dataMonth, day] = date.split("-").map(Number);
  const month = dataMonth - 1;
  const dayOfWeek = new Date(year, month, day).getDay();
  const workSchedule = await prisma.workSchedule.findFirst({
    where: {
      doctorId,
      dayOfWeek: dayOfWeek === 0 ? 6 : dayOfWeek - 1,
    },
  });
  console.log("workSchedule :>> ", workSchedule);
  if (!workSchedule) {
    return Response.json(
      { error: "work schedule is not found" },
      { status: 404 },
    );
  }
  const serviceDuration = service.durationMinutes;
  const serviceDurationMs = serviceDuration * 60 * 1000;
  const { startTime, endTime } = workSchedule;
  const [startHour, startMins] = startTime.split(":").map(Number);
  const [endHour, endMins] = endTime.split(":").map(Number);

  const workStart = new Date(year, month, day, startHour, startMins);
  const workEnd = new Date(year, month, day, endHour, endMins);

  let freeBusy;
  try {
    freeBusy = await getFreeBusy({
      timeMin: workStart,
      timeMax: workEnd,
      calendarId: CALENDAR_ID,
    });
  } catch (err) {
    console.error("Google Calendar API error:", err);
    return Response.json(
      { error: "failed to fetch calendar data" },
      { status: 502 },
    );
  }

  const busyPeriods = freeBusy ?? [];

  // const freeSlots = generateFreeSlots({
  //   workStart,
  //   workEnd,
  //   busyPeriods,
  //   slotDuration: serviceDuration,
  // });
  // console.log("freeSlots :>> ", freeSlots);
  // console.log("busyPeriods :>> ", busyPeriods);
  // return Response.json(busyPeriods);
  const slots = generateSlots(workStart, workEnd, serviceDurationMs);
  return Response.json(
    generateFreeSlots({ slots, freebusy: busyPeriods, serviceDurationMs }),
  );
  // return Response.json(freeSlots);
}
