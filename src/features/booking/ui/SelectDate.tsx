"use client";

import { useEffect, useState } from "react";
import useBookingStore from "../store/store";
import DateCalendar from "./DateCalendar";
import TimeSlotPicker from "./TimeSlotPicker";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/shared/config/routes";
import WeekDaysList from "./WeekDaysList";
import MonthPicker from "./MonthPicker";
import isPrevMonthDisabled from "../modules/isPrevMonthDisabled";

const SelectDate = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const selectedSlot = useBookingStore((state) => state.selectedSlot);

  const router = useRouter();

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const prevMonth = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1));
  };

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
    <div className="mt-8">
      <MonthPicker
        currentDate={currentDate}
        isPrevDisabled={isPrevMonthDisabled(year, month, today)}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />

      <div className="grid gap-4 mt-3 sm:flex">
        <div className="flex-1">
          <WeekDaysList />
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
          onClick={() => router.push(ROUTES.submit)}
          type="submit"
          className="btn-primary w-full rounded-lg py-3 mt-4"
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default SelectDate;
