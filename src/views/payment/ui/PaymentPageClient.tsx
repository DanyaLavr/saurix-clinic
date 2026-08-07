"use client";
import useBookingStore from "@/src/features/booking/store/store";
import PaymentListItem from "./PaymentListItem";
import { useRouter } from "next/navigation";
import createBookingEvent from "@/src/features/booking/modules/createBookingEvent";
import { useSession } from "next-auth/react";

const PaymentPageClient = () => {
  const router = useRouter();
  const session = useSession();
  const patientEmail = session.data?.user.email;
  const { selectedDoctor, selectedService, selectedDate, selectedSlot } =
    useBookingStore();

  if (
    !selectedDoctor ||
    !selectedService ||
    !selectedDate ||
    !selectedSlot ||
    !session ||
    !patientEmail
  ) {
    return null;
  }

  const formattedDate = new Date(selectedDate).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = new Date(selectedSlot).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  });
  const handleCashPayment = async () => {
    try {
      const res = await fetch("/api/create-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          serviceId: selectedService.id,
          startsAt: selectedSlot,
          paymentMethod: "CASH",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Не удалось создать запись");
      }
      const start = new Date(selectedSlot);
      const end = new Date(
        start.getTime() + selectedService.durationMinutes * 60 * 1000,
      );
      createBookingEvent({
        doctorId: selectedDoctor.id,
        doctorEmail: "",
        patientEmail,
        serviceName: selectedService.name,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      });
      router.push("/booking/success");
    } catch (err) {
      console.error(err);
      // тут стоит показать пользователю ошибку, а не молча падать
    }
  };

  const handleCardPayment = () => {
    // router.push("/booking/payment");
  };

  return (
    <main className="min-h-screen bg-amber-50">
      <section className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white border border-amber-100 rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Details of booking
          </h2>

          <div className="space-y-3">
            <PaymentListItem title="Врач" data={selectedDoctor.name} />
            <PaymentListItem title="Услуга" data={selectedService.name} />
            <PaymentListItem title="Дата" data={formattedDate} />
            <PaymentListItem title="Время" data={formattedTime} />

            <div className="flex justify-between items-center pt-1">
              <span className="text-gray-700 font-medium">К оплате</span>
              <span className="text-gray-900 font-semibold text-lg">
                {selectedService.price} €
              </span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-sm text-gray-500 mb-2">Payment method</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCashPayment}
                className="flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors bg-white border-gray-200 text-gray-700 hover:border-amber-300 active:bg-amber-500 active:border-amber-500 active:text-white"
              >
                In cash
              </button>
              <button
                type="button"
                onClick={handleCardPayment}
                className="flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors bg-white border-gray-200 text-gray-700 hover:border-amber-300 active:bg-amber-500 active:border-amber-500 active:text-white"
              >
                By card
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaymentPageClient;
