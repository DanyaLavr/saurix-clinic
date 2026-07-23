import { google } from "googleapis";

const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const email = process.env.GOOGLE_CLIENT_EMAIL;
const calendarAuth = new google.auth.GoogleAuth({
  credentials: {
    client_email: email,
    private_key: key,
  },
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

export default calendarAuth;
