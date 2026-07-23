import { IDoctor, IServiceWithNumberPrice } from "@/types/doctors";
import { create } from "zustand";
interface IBookingStore {
  selectedDoctor: IDoctor | null;
  setSelectedDoctor: (doctor: IDoctor | null) => void;
  selectedService: IServiceWithNumberPrice | null;
  setSelectedService: (service: IServiceWithNumberPrice | null) => void;
  selectedDate: string | null;
  setSelectedDate: (date: string) => void;
  selectedSlot: string | null;
  setSelectedSlot: (slot: string) => void;
  resetSelectedSlot: () => void;
}
const useBookingStore = create<IBookingStore>()((set) => ({
  selectedDoctor: null,
  setSelectedDoctor: (doctor: IDoctor | null) =>
    set({ selectedDoctor: doctor }),
  selectedService: null,
  setSelectedService: (service: IServiceWithNumberPrice | null) =>
    set({ selectedService: service }),
  selectedDate: null,
  setSelectedDate: (date: string) => set({ selectedDate: date }),
  selectedSlot: null,
  setSelectedSlot: (slot: string) => set({ selectedSlot: slot }),
  resetSelectedSlot: () => set({ selectedSlot: null }),
}));

if (typeof window !== "undefined") {
  (window as any).useBookingStore = useBookingStore;
}
export default useBookingStore;
