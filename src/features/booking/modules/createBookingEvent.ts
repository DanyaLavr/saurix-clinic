"use server";
import getDoctorCalendar from "@/src/entities/doctors/module/getDoctorCalendar";

interface IProps {
  doctorId: string;
  doctorEmail: string;
  patientEmail: string;
  serviceName: string;
  startTime: string;
  endTime: string;
}
const createBookingEvent = async ({
  doctorId,
  doctorEmail,
  patientEmail,
  serviceName,
  startTime,
  endTime,
}: IProps) => {
  try {
    // const auth = new google.auth.JWT({
    //   email: process.env.GOOGLE_CLIENT_EMAIL,
    //   key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    //   scopes: ["https://www.googleapis.com/auth/calendar"],
    //   subject: doctorEmail,
    // });

    // const calendar = google.calendar({
    //   version: "v3",
    //   auth,
    // });

    const { calendar, calendarId } = await getDoctorCalendar(doctorId);
    const response = await calendar.events.insert({
      calendarId: calendarId,
      sendUpdates: "all",
      requestBody: {
        summary: `Запись: ${serviceName}`,
        start: { dateTime: startTime, timeZone: "Europe/Madrid" },
        end: { dateTime: endTime, timeZone: "Europe/Madrid" },
        attendees: [
          { email: "danya.lavrovskiy@gmail.com" },
          { email: patientEmail },
        ],
      },
    });

    if (!response.data.id) {
      return { success: false, error: "Google API не вернул id события" };
    }

    return {
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink ?? undefined,
    };
  } catch (err) {
    console.error("Ошибка создания события в календаре:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Неизвестная ошибка",
    };
  }
};
export default createBookingEvent;
