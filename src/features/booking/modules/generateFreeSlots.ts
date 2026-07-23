import { TFreeBusy } from "@/types/doctors";

interface IProps {
  slots: Date[];
  freebusy: TFreeBusy[];
  serviceDurationMs: number;
}

const generateFreeSlots = ({ slots, freebusy, serviceDurationMs }: IProps) => {
  if (freebusy.length === 0) {
    return slots.map((slot) => ({ date: slot, isAvailable: true }));
  }

  return slots.map((slot) => ({
    date: slot,
    isAvailable: !freebusy.some(
      (elem) =>
        (elem?.start
          ? +new Date(elem.start) - serviceDurationMs <= +slot
          : false) && (elem?.end ? +new Date(elem.end) >= +slot : false),
    ),
  }));
};

export default generateFreeSlots;
