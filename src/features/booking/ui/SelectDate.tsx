"use client";

import { useEffect, useMemo, useState } from "react";
import { IToNextStep } from "../types/props";
import useBookingStore from "../store/store";
import DateCalendar from "./DateCalendar";
import TimeSlotPicker from "./TimeSlotPicker";
import { useRouter } from "next/navigation";

const daysNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const SelectDate = ({ toNextStep }: IToNextStep) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const selectedDoctor = useBookingStore((state) => state.selectedDoctor);
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const selectedSlot = useBookingStore((state) => state.selectedSlot);
  const selectedService = useBookingStore((state) => state.selectedService);

  const router = useRouter();

  const prevMonth = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1));
  };
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const isPrevDisabled = useMemo(() => {
    return (
      year < today.getFullYear() ||
      (year === today.getFullYear() && month <= today.getMonth())
    );
  }, [year, month, today]);

  //TODO
  //* Авто блокировка дат, если там нет слотов
  //* (все время занято дургими процедурами)
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const res = await fetch(
  //         `/api/get-doctor-calendar?date=${year}-${month}&serviceId=${selectedService?.id}&doctorId=${selectedDoctor?.id}`,
  //       );
  //       const data = await res.json();
  //       console.log("data :>> ", data);
  //     } catch (e) {
  //       console.error("error >>> ", e);
  //     }
  //   };
  //   getData();
  // }, [currentDate]);
  return (
    <div>
      <div className="flex gap-4">
        <button onClick={prevMonth} disabled={isPrevDisabled}>
          {`<`}
        </button>
        <p>
          {monthName} - {year}
        </p>
        <button onClick={nextMonth}>{`>`}</button>
      </div>

      <div className="grid gap-4 sm:flex">
        <div className="flex-1">
          <div className="grid grid-cols-7 justify-items-center">
            {daysNames.map((elem, index) => (
              <div key={index}>{elem}</div>
            ))}
          </div>
          <DateCalendar today={today} month={month} year={year} />
        </div>
        <span className="block w-full h-0.5 bg-amber-600 sm:hidden"></span>
        {selectedDate ? (
          <TimeSlotPicker />
        ) : (
          <p className="flex-1 grid justify-items-center items-center">
            Спочатку оберіть дату
          </p>
        )}
      </div>
      {selectedDate && selectedSlot && (
        <button
          onClick={() => router.push("/payment")}
          type="submit"
          className="mt-4 w-full py-3 bg-amber-800 text-amber-50 rounded-lg font-medium hover:bg-amber-900 transition-colors"
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default SelectDate;
