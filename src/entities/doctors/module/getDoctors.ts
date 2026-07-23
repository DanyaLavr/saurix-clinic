"use server";
import { prisma } from "@/src/lib/prisma";
const getDoctors = async () => {
  return await prisma.doctor.findMany();
};

export default getDoctors;
