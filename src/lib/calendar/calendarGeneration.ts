import { google } from "googleapis";
import calendarAuth from "./authGeneration";

const calendar = google.calendar({ version: "v3", auth: calendarAuth });

export default calendar;
