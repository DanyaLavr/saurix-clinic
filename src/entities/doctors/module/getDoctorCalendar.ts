import getCalendar from "@/src/lib/calendar/calendarGeneration";
import prisma from "@/src/lib/prisma";
import { decryptToken } from "@/src/shared/module/tokenCrypto";
import { calendar_v3 } from "googleapis";

const getDoctorCalendar = async (
  doctorId: string,
): Promise<{ calendar: calendar_v3.Calendar; calendarId: string }> => {
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    include: { googleCalendar: true },
  });
  if (!doctor?.googleCalendar || !doctor?.googleCalendar?.refreshToken) {
    throw new Error(`Доктор "${doctor?.name}" не подключил Google Calendar`);
  }
  const refreshToken = decryptToken(doctor.googleCalendar.refreshToken);
  const calendar = getCalendar(refreshToken);
  const calendarId = doctor.googleCalendar.calendarId;

  return { calendar, calendarId };
};

export default getDoctorCalendar;
