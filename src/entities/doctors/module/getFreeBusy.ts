import calendar from "@/src/lib/calendar/calendarGeneration";
interface IProps {
  timeMin: Date;
  timeMax: Date;
  calendarId: string;
}
const getFreeBusy = async ({ timeMin, timeMax, calendarId }: IProps) => {
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
