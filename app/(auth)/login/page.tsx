import LoginForm from "@/src/features/auth/login/ui/LoginForm";
import Loader from "@/src/shared/ui/Loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Вход" };

export default function Login() {
  return (
    <Suspense fallback={<Loader />}>
      <LoginForm />
    </Suspense>
  );
}
