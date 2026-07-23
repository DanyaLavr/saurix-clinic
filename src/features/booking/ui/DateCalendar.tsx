"use client";

import { useEffect, useMemo, useState } from "react";
import useBookingStore from "../store/store";
import getDoctorWorkSchedule from "@/src/entities/doctors/module/getDoctorWorkSchedule";
import DateItem from "./DateItem";

const daysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

interface IProps {
  today: Date;
  month: number;
  year: number;
}
const DateCalendar = ({ today, month, year }: IProps) => {
  const [workSchedule, setWorkSchedule] = useState<any>();
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const selectedDoctor = useBookingStore((state) => state.selectedDoctor);
  const setSelectedDate = useBookingStore((state) => state.setSelectedDate);
  const resetSelectedSlot = useBookingStore((state) => state.resetSelectedSlot);
  const isCurrentDay = (calendarDay: string): boolean => {
    return (
      `${year}-${String(month + 1).padStart(2, "0")}-${String(calendarDay).padStart(2, "0")}` ===
      selectedDate
    );
  };
  const isDayOff = (day: number): boolean => {
    if (!workSchedule) return false;
    const weekday = (new Date(year, month, day).getDay() + 6) % 7;
    return !workSchedule.some((elem: any) => elem.dayOfWeek === weekday);
  };
  const minBookableDate = useMemo(() => {
    const date = new Date(today);
    date.setDate(date.getDate() + 1);
    return date;
  }, [today]);

  const isNotAvailable = (day: number): boolean => {
    const date = new Date(year, month, day);
    return date < minBookableDate;
  };
  const firstDay = (new Date(year, month).getDay() + 6) % 7;
  const calendarDays = useMemo(
    () => [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1),
    ],
    [month],
  );

  useEffect(() => {
    if (!selectedDoctor?.id) return;

    getDoctorWorkSchedule(selectedDoctor?.id).then(setWorkSchedule);
  }, [selectedDoctor?.id]);

  return (
    <div className="grid grid-cols-7 content-center justify-items-center">
      {calendarDays.map((elem, index) =>
        elem ? (
          <DateItem
            key={`${year}-${String(month + 1).padStart(2, "0")}-${String(elem).padStart(2, "0")}`}
            isDisabled={isDayOff(elem) || isNotAvailable(elem)}
            isCurrentDay={isCurrentDay(elem)}
            date={elem}
            setSelectedDate={() => {
              resetSelectedSlot();
              setSelectedDate(
                `${year}-${String(month + 1).padStart(2, "0")}-${String(elem).padStart(2, "0")}`,
              );
            }}
          />
        ) : (
          <span key={index}></span>
        ),
      )}
    </div>
  );
};

export default DateCalendar;
