"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const DoctorSettingsContent = () => {
  const searchParams = useSearchParams();
  const calendarStatus = searchParams.get("calendar");

  useEffect(() => {
    if (calendarStatus === "connected") {
      alert("Календарь подключён");
    } else if (calendarStatus === "error") {
      alert("Ошибка подключения");
    } else if (calendarStatus === "no_refresh_token") {
      alert("Попробуйте отозвать доступ и подключить заново");
    }
  }, [calendarStatus]);

  return <div>{/* ваша страница настроек */}</div>;
};

export default DoctorSettingsContent;
