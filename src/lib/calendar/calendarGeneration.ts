import "server-only";
import { google } from "googleapis";
import getCalendarAuthForDoctor from "./authGeneration";

const getCalendar = (token: string) =>
  google.calendar({
    version: "v3",
    auth: getCalendarAuthForDoctor(token),
  });

export default getCalendar;
