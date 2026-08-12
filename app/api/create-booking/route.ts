import prisma from "@/src/lib/prisma";
import { authConfig } from "@/src/shared/config/authConfig";
import { bookingSchema } from "@/src/shared/config/bookingSchemas";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }
  const body = await req.json();
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    );
  }
  const { doctorId, serviceId, startsAt } = parsed.data;
  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!currentUser?.patientId) {
    return NextResponse.json(
      { error: "Только пациенты могут создавать запись" },
      { status: 403 },
    );
  }

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) {
    return NextResponse.json({ error: "Услуга не найдена" }, { status: 404 });
  }

  const start = new Date(startsAt);
  const end = new Date(start.getTime() + service.durationMinutes * 60 * 1000);

  const dayOfWeek = start.getDay();
  const schedule = await prisma.workSchedule.findFirst({
    where: { doctorId, dayOfWeek },
  });
  if (!schedule) {
    return NextResponse.json(
      { error: "У доктора нет расписания в этот день" },
      { status: 409 },
    );
  }
  const requestedStartTime = start.toTimeString().slice(0, 5);
  const requestedEndTime = end.toTimeString().slice(0, 5);
  if (
    requestedStartTime < schedule.startTime ||
    requestedEndTime > schedule.endTime
  ) {
    return NextResponse.json(
      { error: "Время вне рабочих часов доктора" },
      { status: 409 },
    );
  }
  const conflict = await prisma.booking.findFirst({
    where: {
      doctorId,
      status: { not: "CANCELLED" },
      AND: [{ startsAt: { lt: end } }, { endsAt: { gt: start } }],
    },
  });
  if (conflict) {
    return NextResponse.json(
      { error: "Это время уже занято" },
      { status: 409 },
    );
  }

  const booking = await prisma.booking.create({
    data: {
      doctorId,
      serviceId,
      patientId: currentUser.patientId!,
      startsAt: start,
      endsAt: end,
      status: "CONFIRMED",
    },
  });

  return NextResponse.json(booking, { status: 201 });
}
