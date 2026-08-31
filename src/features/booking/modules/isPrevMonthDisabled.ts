const isPrevMonthDisabled = (
  year: number,
  month: number,
  today: Date,
): boolean => {
  return (
    year < today.getFullYear() ||
    (year === today.getFullYear() && month <= today.getMonth())
  );
};
export default isPrevMonthDisabled;
