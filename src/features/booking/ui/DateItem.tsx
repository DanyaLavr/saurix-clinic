interface IProps {
  isDisabled: boolean;
  isCurrentDay: boolean;
  date: number;
  setSelectedDate: () => void;
}
const DateItem = ({
  isDisabled,
  isCurrentDay,
  date,
  setSelectedDate,
}: IProps) => {
  console.log(date, isDisabled);
  return (
    <button
      disabled={isDisabled}
      onClick={setSelectedDate}
      className={`
    w-10 h-10 rounded-md text-sm font-medium
    transition-colors duration-150
    text-stone-700
    hover:bg-amber-100
    focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-1
    disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed
    ${isCurrentDay ? "bg-amber-300 hover:bg-amber-300 text-stone-900 font-semibold" : ""}
  `}
    >
      {date}
    </button>
  );
};

export default DateItem;
