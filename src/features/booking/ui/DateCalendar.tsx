"use client";

import { useEffect, useMemo, useState } from "react";
import useBookingStore from "../store/store";
import getDoctorWorkSchedule from "@/src/entities/doctors/module/getDoctorWorkSchedule";
import DateItem from "./DateItem";
import {
  isDayOff,
  isCurrentDay,
  isNotAvailable,
  getFirstDayOfMonth,
} from "../modules/date-calendar";
import { WorkSchedule } from "@/app/generated/prisma/client";

const daysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

interface IProps {
  today: Date;
  month: number;
  year: number;
}
const DateCalendar = ({ today, month, year }: IProps) => {
  const [workSchedule, setWorkSchedule] = useState<WorkSchedule[]>();
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const selectedDoctor = useBookingStore((state) => state.selectedDoctor);
  const setSelectedDate = useBookingStore((state) => state.setSelectedDate);
  const resetSelectedSlot = useBookingStore((state) => state.resetSelectedSlot);

  const minBookableDate = useMemo(() => {
    const date = new Date(today);
    date.setDate(date.getDate() + 1);
    return date;
  }, [today]);

  const firstDay = getFirstDayOfMonth(year, month);
  const calendarDays = useMemo(
    () => [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1),
    ],
    [firstDay, year, month],
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
            isDisabled={
              isDayOff(year, month, elem, workSchedule) ||
              isNotAvailable(year, month, elem, minBookableDate)
            }
            isCurrentDay={isCurrentDay(year, month, elem, selectedDate)}
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
