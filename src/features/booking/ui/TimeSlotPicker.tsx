"use client";
import useBookingStore from "../store/store";
import Loader from "@/src/shared/ui/Loader";
import useFreeSlotsQuery from "../hooks/useFreeSlotsQuery";

const TimeSlotPicker = () => {
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const selectedDoctor = useBookingStore((state) => state.selectedDoctor);
  const selectedService = useBookingStore((state) => state.selectedService);
  const selectedSlot = useBookingStore((state) => state.selectedSlot);
  const setSelectedSlot = useBookingStore((state) => state.setSelectedSlot);

  if (!selectedDoctor?.id)
    return <div className="p-4 text-gray-500">Спочатку оберіть лікара</div>;
  if (!selectedService?.id)
    return <div className="p-4 text-gray-500">Спочатку оберіть процедуру</div>;
  if (!selectedDate)
    return <div className="p-4 text-gray-500">Спочатку оберіть день</div>;

  const {
    data: slots,
    isLoading,
    error,
  } = useFreeSlotsQuery({
    date: selectedDate,
    serviceId: selectedService.id,
    doctorId: selectedDoctor.id,
  });

  return (
    <div className="flex-1 grid grid-cols-3 gap-2">
      {isLoading && (
        <Loader className="col-span-3 justify-center self-center" />
      )}
      {error && (
        <p className="col-span-3 text-center self-center text-red-600 py-6">
          Не удалось загрузить время приёма
        </p>
      )}
      {!!slots &&
        !!slots.length &&
        !isLoading &&
        !error &&
        slots.map((elem, i) => {
          const date = new Date(elem?.date);
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          const isSelected = selectedSlot === date.toISOString();
          return (
            <button
              key={i}
              disabled={!elem.isAvailable}
              onClick={() => setSelectedSlot(date.toISOString())}
              className={`
          w-full px-3 py-2 rounded-md text-sm font-medium
          transition-colors duration-150
          text-stone-700 border border-transparent
          hover:bg-amber-100
          focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-1
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:line-through disabled:text-stone-400
              ${isSelected ? "bg-amber-300 hover:bg-amber-300 text-stone-900 font-semibold" : ""}
       
        `}
            >
              {hours}:{minutes}
            </button>
          );
        })}
    </div>
  );
};

export default TimeSlotPicker;
