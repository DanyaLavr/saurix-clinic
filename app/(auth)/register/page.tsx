import RegisterForm from "@/src/features/auth/register/ui/RegisterForm";
import Loader from "@/src/shared/ui/Loader";
import { Suspense } from "react";

export default function Register() {
  return (
    <Suspense fallback={<Loader />}>
      <RegisterForm />
    </Suspense>
  );
}
