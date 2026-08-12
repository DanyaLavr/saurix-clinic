"use client";
import getDoctorService from "@/src/entities/doctors/module/getDoctorService";
import useBookingStore from "../store/store";
import { IServiceWithNumberPrice } from "@/types/doctors";
import { IToNextStep } from "../types/props";
import Loader from "@/src/shared/ui/Loader";
import { useAsync } from "@/src/shared/hooks/useAsync";

const SelectService = ({ toNextStep }: IToNextStep) => {
  const selectedDoctor = useBookingStore((state) => state.selectedDoctor);
  const selectedService = useBookingStore((state) => state.selectedService);
  const setSelectedService = useBookingStore(
    (state) => state.setSelectedService,
  );
  if (!selectedDoctor)
    return <div className="p-4 text-gray-500">Спочатку оберіть лікаря</div>;
  const {
    data: services,
    loading,
    error,
  } = useAsync<IServiceWithNumberPrice[]>(
    () => getDoctorService(selectedDoctor?.id),
    [selectedDoctor.id],
  );
  if (loading) return <Loader className="justify-self-center" />;
  if (error)
    return <div className="p-4 text-red-600">Ошибка загрузки услуг</div>;
  if (!services || services.length === 0)
    return <div className="p-4 text-gray-500">No services</div>;

  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        toNextStep();
      }}
    >
      {services.map(({ id, name, durationMinutes, price }) => (
        <div key={id}>
          <input
            type="radio"
            id={id}
            name="service"
            className="hidden"
            checked={selectedService?.id === id}
            onChange={() =>
              setSelectedService(services.find((s) => s.id === id) || null)
            }
          />
          <label
            htmlFor={id}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
              selectedService?.id === id
                ? "bg-amber-800 text-amber-50 border-amber-800"
                : "bg-white text-amber-900 border-amber-200 hover:border-amber-400"
            }`}
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-medium">{name}</h3>
              <p
                className={`text-sm ${selectedService?.id === id ? "text-amber-200" : "text-amber-500"}`}
              >
                {durationMinutes} min
              </p>
            </div>
            <span className="font-medium">{price}€</span>
          </label>
        </div>
      ))}

      {selectedService && (
        <button
          type="submit"
          className="btn-primary w-full rounded-lg py-3 mt-4"
        >
          Continue
        </button>
      )}
    </form>
  );
};

export default SelectService;
