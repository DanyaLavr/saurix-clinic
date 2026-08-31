"use client";
import useBookingStore from "@/src/features/booking/store/store";
import { useRouter } from "next/navigation";
import createBookingEvent from "@/src/features/booking/modules/createBookingEvent";
import { useSession } from "next-auth/react";
import SubmitListItem from "./SubmitListItem";
import ErrorPageClient from "./ErrorPageClient";
import { useFormatter, useTranslations } from "next-intl";

const SubmitPageClient = () => {
  const router = useRouter();
  const session = useSession();
  const format = useFormatter();
  const t = useTranslations("submit-booking.booking");
  const patientEmail = session.data?.user.email;
  const { selectedDoctor, selectedService, selectedDate, selectedSlot } =
    useBookingStore();

  if (!session || !patientEmail) {
    return <ErrorPageClient />;
  }
  if (!selectedDoctor || !selectedService || !selectedDate || !selectedSlot) {
    return null;
  }

  const formattedDate = format.dateTime(new Date(selectedDate), {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = new Date(selectedSlot).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  });
  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/create-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          serviceId: selectedService.id,
          startsAt: selectedSlot,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create booking");
      }
      const start = new Date(selectedSlot);
      const end = new Date(
        start.getTime() + selectedService.durationMinutes * 60 * 1000,
      );
      createBookingEvent({
        doctorId: selectedDoctor.id,
        patientEmail,
        serviceName: selectedService.name,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      });
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex-1 bg-amber-50">
      <section className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white border border-amber-100 rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">{t("title")}</h2>

          <div className="space-y-3">
            <SubmitListItem title={t("doctor")} data={selectedDoctor.name} />
            <SubmitListItem title={t("service")} data={selectedService.name} />
            <SubmitListItem title={t("date")} data={formattedDate} />
            <SubmitListItem title={t("time")} data={formattedTime} />

            <div className="flex justify-between items-center pt-1">
              <span className="text-gray-700 font-medium">
                {t("totalToPay")}
              </span>
              <span className="text-gray-900 font-semibold text-lg">
                {selectedService.price} €
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-primary w-full rounded-lg px-4 py-2.5 text-sm"
            >
              {t("submitButton")}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SubmitPageClient;
