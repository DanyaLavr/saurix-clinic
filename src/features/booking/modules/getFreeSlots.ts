import prisma from "@/src/lib/prisma";
import {
  NotFoundError,
  UpstreamError,
} from "@/src/features/booking/modules/errorClasses";
import getFreeBusy from "@/src/entities/doctors/module/getFreeBusy";
import generateSlots from "@/src/features/booking/modules/generateSlots";
import generateFreeSlots from "@/src/features/booking/modules/generateFreeSlots";
import { IGetFreeSlotsParams } from "../types/props";

export async function getFreeSlots({
  date,
  serviceId,
  doctorId,
}: IGetFreeSlotsParams) {
  const service = await prisma.service.findUnique({ where: { id: serviceId } });

  if (!service) {
    throw new NotFoundError("servise is not found");
  }

  const [year, dataMonth, day] = date.split("-").map(Number);
  const month = dataMonth - 1;
  const dayOfWeek = new Date(year, month, day).getDay();
  const workSchedule = await prisma.workSchedule.findFirst({
    where: {
      doctorId,
      dayOfWeek,
    },
  });

  if (!workSchedule) {
    throw new NotFoundError("work schedule is not found");
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
      doctorId: doctorId,
    });
  } catch (err) {
    console.error("Google Calendar API error:", err);
    throw new UpstreamError("failed to fetch calendar data");
  }

  const busyPeriods = freeBusy ?? [];

  const slots = generateSlots(workStart, workEnd, serviceDurationMs);

  return generateFreeSlots({ slots, freebusy: busyPeriods, serviceDurationMs });
}
