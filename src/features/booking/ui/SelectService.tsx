"use client";
import getDoctorService from "@/src/entities/doctors/module/getDoctorService";
import { useEffect, useState } from "react";
import useBookingStore from "../store/store";
import { IServiceWithNumberPrice } from "@/types/doctors";
import { IToNextStep } from "../types/props";

const SelectService = ({ toNextStep }: IToNextStep) => {
  const [services, setServices] = useState<IServiceWithNumberPrice[]>([]);
  const selectedDoctor = useBookingStore((state) => state.selectedDoctor);
  const selectedService = useBookingStore((state) => state.selectedService);
  const setSelectedService = useBookingStore(
    (state) => state.setSelectedService,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!selectedDoctor?.id) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    getDoctorService(selectedDoctor.id).then((data) => {
      setServices(data);
      setIsLoading(false);
    });
  }, [selectedDoctor?.id]);

  if (isLoading) return <div className="p-4 text-gray-500">Loading...</div>;
  if (!services.length)
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
          className="mt-4 w-full py-3 bg-amber-800 text-amber-50 rounded-lg font-medium hover:bg-amber-900 transition-colors"
        >
          Continue
        </button>
      )}
    </form>
  );
};

export default SelectService;
