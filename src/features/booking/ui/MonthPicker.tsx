"use client";
import Arrow from "@/src/shared/ui/icons/chevron.svg";
import { useFormatter } from "use-intl";

interface IProps {
  currentDate: Date;
  isPrevDisabled: boolean;
  prevMonth: () => void;
  nextMonth: () => void;
}
const MonthPicker = ({
  currentDate,
  isPrevDisabled,
  prevMonth,
  nextMonth,
}: IProps) => {
  const format = useFormatter();

  const year = currentDate.getFullYear();
  const monthName = format.dateTime(currentDate, { month: "long" });

  return (
    <div className="flex items-center gap-4 sm:w-[49%]">
      <button
        className="btn-ghost rounded-lg px-2.5 py-1.5 disabled:cursor-not-allowed disabled:opacity-20"
        onClick={prevMonth}
        disabled={isPrevDisabled}
      >
        <Arrow className="rotate-180" />
      </button>
      <p className="flex-1 text-center capitalize ">
        {monthName} - {year}
      </p>
      <button
        onClick={nextMonth}
        className="btn-ghost rounded-lg px-2.5 py-1.5"
      >
        <Arrow />
      </button>
    </div>
  );
};

export default MonthPicker;
