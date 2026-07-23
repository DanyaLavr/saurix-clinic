const generateSlots = (
  workStart: Date,
  workEnd: Date,
  serviceDurationMs: number,
): Date[] => {
  const slots: Date[] = [];
  const stepMs = 15 * 60 * 1000;
  const endMs = workEnd.getTime() - serviceDurationMs;

  for (let i = workStart.getTime(); i <= endMs; i += stepMs) {
    slots.push(new Date(i));
  }
  return slots;
};
export default generateSlots;
