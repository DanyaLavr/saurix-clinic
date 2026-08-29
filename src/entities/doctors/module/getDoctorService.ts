import prisma from "@/src/lib/prisma";
import { IServiceWithNumberPrice } from "@/types/doctors";

const getDoctorService = async (
  doctorId: string,
): Promise<IServiceWithNumberPrice[]> => {
  const result = await prisma.doctorService.findMany({
    where: { doctorId },
    include: {
      service: true,
    },
  });
  return result.map((ds) => ({
    ...ds.service,
    price: ds.service.price.toNumber(),
  }));
};

export default getDoctorService;
