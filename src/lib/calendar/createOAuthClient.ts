import "server-only";
import { google } from "googleapis";

const createOAuthClient = () =>
  new google.auth.OAuth2(
    process.env.GOOGLE_AUTH_CLIENT_ID,
    process.env.GOOGLE_AUTH_SECRET,
    `${process.env.NEXTAUTH_URL}/api/google/callback`,
  );

export default createOAuthClient;
