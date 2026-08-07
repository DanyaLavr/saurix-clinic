import createOAuthClient from "@/src/lib/calendar/createOAuthClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get("doctorId");
  if (!doctorId) {
    return NextResponse.json({ error: "doctorId is null" }, { status: 400 });
  }
  const oauth2Client = createOAuthClient();
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/calendar"],
    state: doctorId,
  });
  return NextResponse.redirect(authUrl);
}
