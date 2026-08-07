import Loader from "@/src/shared/ui/Loader";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function DoctorSettingsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <DoctorSettingsPage />
    </Suspense>
  );
}
