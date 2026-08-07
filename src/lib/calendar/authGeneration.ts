import "server-only";
import { google } from "googleapis";

const getCalendarAuthForDoctor = (token: string) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_AUTH_CLIENT_ID,
    process.env.GOOGLE_AUTH_SECRET,
  );

  oauth2Client.setCredentials({ refresh_token: token });
  return oauth2Client;
};
export default getCalendarAuthForDoctor;
