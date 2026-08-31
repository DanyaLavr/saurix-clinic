"use client";

import { useFormatter } from "next-intl";

const WeekDaysList = () => {
  const { dateTime } = useFormatter();
  const daysNames = Array.from({ length: 7 }, (_, i) =>
    dateTime(new Date(0, 0, i + 1), { weekday: "short" }),
  );
  return (
    <div className="grid grid-cols-7 justify-items-center">
      {daysNames.map((elem, index) => (
        <div key={index}>{elem}</div>
      ))}
    </div>
  );
};

export default WeekDaysList;
