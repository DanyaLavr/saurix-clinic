"use server";
import { prisma } from "@/src/lib/prisma";
import { IDoctor } from "@/types/doctors";
const getDoctors = async (): Promise<IDoctor[]> => {
  return await prisma.doctor.findMany();
};

export default getDoctors;
