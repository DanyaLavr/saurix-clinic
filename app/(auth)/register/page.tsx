import RegisterForm from "@/src/features/auth/register/ui/RegisterForm";
import Loader from "@/src/shared/ui/Loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Регистрация",
};

export default function Register() {
  return (
    <Suspense fallback={<Loader />}>
      <RegisterForm />
    </Suspense>
  );
}
