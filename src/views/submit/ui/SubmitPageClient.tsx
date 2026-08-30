"use client";
import useBookingStore from "@/src/features/booking/store/store";
import { useRouter } from "next/navigation";
import createBookingEvent from "@/src/features/booking/modules/createBookingEvent";
import { useSession } from "next-auth/react";
import SubmitListItem from "./SubmitListItem";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/src/shared/config/routes";

const SubmitPageClient = () => {
  const router = useRouter();
  const session = useSession();
  const patientEmail = session.data?.user.email;
  const { selectedDoctor, selectedService, selectedDate, selectedSlot } =
    useBookingStore();

  if (!session || !patientEmail) {
    return (
      <main className="flex-1 bg-amber-50 flex items-center justify-center px-4">
        <section className="bg-white max-w-2xl mx-auto pb-10 rounded-2xl shadow-sm text-center">
          <div className="mx-auto mb-5 flex h-14 w-full items-center justify-center rounded-t-2xl bg-amber-100">
            <svg
              className="h-7 w-7 text-amber-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0 3.75h.008M10.29 3.86l-8.08 14a2 2 0 001.73 3h16.12a2 2 0 001.73-3l-8.08-14a2 2 0 00-3.46 0z"
              />
            </svg>
          </div>
          <div className="px-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Не удалось открыть бронирование
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Для просмотра деталей бронирования необходимо войти в аккаунт.
              Возможно, ваша сессия завершилась или данные пользователя
              недоступны.
            </p>

            <div className="mt-6">
              <Link
                href={ROUTES.login}
                className="flex w-full items-center justify-center rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-600 active:bg-amber-700"
              >
                Войти в аккаунт
              </Link>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              После входа вы сможете вернуться к деталям бронирования.
            </p>
          </div>
        </section>
      </main>
    );
  }
  if (!selectedDoctor || !selectedService || !selectedDate || !selectedSlot) {
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
        throw new Error(data.error || "Не удалось создать запись");
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
          <h2 className="text-lg font-semibold text-gray-900">
            Details of booking
          </h2>

          <div className="space-y-3">
            <SubmitListItem title="Врач" data={selectedDoctor.name} />
            <SubmitListItem title="Услуга" data={selectedService.name} />
            <SubmitListItem title="Дата" data={formattedDate} />
            <SubmitListItem title="Время" data={formattedTime} />

            <div className="flex justify-between items-center pt-1">
              <span className="text-gray-700 font-medium">К оплате</span>
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
              Submit
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SubmitPageClient;
