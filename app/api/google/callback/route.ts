import createOAuthClient from "@/src/lib/calendar/createOAuthClient";
import prisma from "@/src/lib/prisma";
import { encryptToken } from "@/src/shared/module/tokenCrypto";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const doctorId = searchParams.get("state");
  if (!code || !doctorId) {
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/doctor/settings?calendar=error`,
    );
  }

  try {
    const oauth2Client = createOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/doctor/settings?calendar=no_refresh_token`,
      );
    }

    oauth2Client.setCredentials(tokens);
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const calendarInfo = await calendar.calendarList.get({
      calendarId: "primary",
    });
    if (!calendarInfo.data.id) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/doctor/settings?calendar=error`,
      );
    }

    await prisma.doctorCalendar.upsert({
      where: { doctorId },
      create: {
        doctorId,
        calendarId: calendarInfo.data.id,
        refreshToken: encryptToken(tokens.refresh_token),
      },
      update: {
        calendarId: calendarInfo.data.id,
        refreshToken: encryptToken(tokens.refresh_token),
      },
    });
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/doctor/settings?calendar=connected`,
    );
  } catch (e) {
    console.error("Ошибка подключения календаря:", e);
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/doctor/settings?calendar=error`,
    );
  }
}
