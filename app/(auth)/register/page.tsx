import RegisterForm from "@/src/features/auth/register/ui/RegisterForm";
import { Suspense } from "react";

export default function Register() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
