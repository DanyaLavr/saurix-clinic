import { useQuery } from "@tanstack/react-query";
import { IGetFreeSlotsParams } from "../types/props";
import { fetchJson } from "@/src/shared/module/fetchJson";
import { ISlot } from "@/types/doctors";

const useFreeSlotsQuery = ({
  date,
  serviceId,
  doctorId,
}: IGetFreeSlotsParams) => {
  return useQuery({
    queryKey: ["free-slots", date, serviceId, doctorId],
    queryFn: ({ signal }) =>
      fetchJson<ISlot[]>(
        `/api/get-doctor-day-slots?date=${date}&serviceId=${serviceId}&doctorId=${doctorId}`,
        signal,
      ),
    enabled: !!date || !!serviceId || !!doctorId,
  });
};

export default useFreeSlotsQuery;
