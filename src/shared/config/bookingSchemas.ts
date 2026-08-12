import z from "zod";

export const bookingSchema = z.object({
  doctorId: z.uuid(),
  serviceId: z.uuid(),
  startsAt: z.iso.datetime(),
});
export type TBookingInput = z.infer<typeof bookingSchema>;
