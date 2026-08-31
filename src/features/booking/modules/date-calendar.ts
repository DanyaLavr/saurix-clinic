import { WorkSchedule } from "@/app/generated/prisma/client";

export const isDayOff = (
  year: number,
  month: number,
  day: number,
  workSchedule: WorkSchedule[] | undefined,
): boolean => {
  if (!workSchedule) return false;
  const weekday = new Date(year, month, day).getDay();
  return !workSchedule.some((elem: any) => elem.dayOfWeek === weekday);
};
export const isCurrentDay = (
  year: number,
  month: number,
  day: string | number,
  selectedDate: string | null,
): boolean => {
  return (
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` ===
    selectedDate
  );
};

export const isNotAvailable = (
  year: number,
  month: number,
  day: number,
  minBookableDate: Date,
): boolean => {
  const date = new Date(year, month, day);
  return date < minBookableDate;
};

export const getFirstDayOfMonth = (year: number, month: number) =>
  (new Date(year, month).getDay() + 6) % 7;
