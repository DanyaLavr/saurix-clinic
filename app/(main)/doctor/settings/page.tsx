import Loader from "@/src/shared/ui/Loader";
import { Suspense } from "react";

export default function DoctorSettingsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <DoctorSettingsPage />
    </Suspense>
  );
}
