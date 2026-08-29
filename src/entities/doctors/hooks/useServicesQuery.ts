import { useQuery } from "@tanstack/react-query";
import getDoctorService from "../module/getDoctorService";
import { fetchJson } from "@/src/shared/module/fetchJson";
import { IServiceWithNumberPrice } from "@/types/doctors";

const useServicesQuery = (doctorId?: string) => {
  return useQuery({
    queryKey: ["doctor-services", doctorId],
    queryFn: ({ signal }) =>
      fetchJson<IServiceWithNumberPrice[]>(
        `/api/get-doctor-services?doctorId=${doctorId}`,
        signal,
      ),
    enabled: !!doctorId,
  });
};

export default useServicesQuery;
