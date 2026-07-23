"use server";
import prisma from "@/src/lib/prisma";

const getDoctorWorkSchedule = async (doctorId: string) => {
  return await prisma.workSchedule.findMany({
    where: {
      doctorId,
    },
  });
};

export default getDoctorWorkSchedule;
