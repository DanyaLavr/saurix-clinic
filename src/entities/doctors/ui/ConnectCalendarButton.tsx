"use client";

interface IProps {
  doctorId: string;
}

const ConnectCalendarButton = ({ doctorId }: IProps) => {
  return (
    <a href={`/api/google/connect?doctorId=${doctorId}`}>
      <button type="button">Подключить Google Calendar</button>
    </a>
  );
};

export default ConnectCalendarButton;
