import prisma from "@/src/lib/prisma";
import { registerSchema } from "@/src/shared/config/authSchemas";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    );
  }
  const { name, email, password } = parsed.data;
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      { error: "Пользователь с таким email уже существует" },
      { status: 409 },
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "PATIENT",
      patient: {
        create: { name },
      },
    },
    include: { patient: true },
  });

  return NextResponse.json({ id: user.id, email: user.email });
}
