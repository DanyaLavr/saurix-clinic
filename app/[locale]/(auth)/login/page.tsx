import LoginForm from "@/src/features/auth/login/ui/LoginForm";
import Loader from "@/src/shared/ui/Loader";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.auth.login");

  return {
    title: t("title"),
  };
}

export default function Login() {
  return (
    <Suspense fallback={<Loader />}>
      <LoginForm />
    </Suspense>
  );
}
