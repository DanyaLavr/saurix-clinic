import getDoctorCalendar from "./getDoctorCalendar";
interface IProps {
  timeMin: Date;
  timeMax: Date;
  doctorId: string;
}
const getFreeBusy = async ({ timeMin, timeMax, doctorId }: IProps) => {
  const { calendar, calendarId } = await getDoctorCalendar(doctorId);
  const { data } = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      items: [
        {
          id: calendarId,
        },
      ],
    },
  });
  return data.calendars?.[calendarId].busy;
};

export default getFreeBusy;
