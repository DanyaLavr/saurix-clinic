import RegisterForm from "@/src/features/auth/register/ui/RegisterForm";
import Loader from "@/src/shared/ui/Loader";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.auth.register");
  return {
    title: t("title"),
  };
}

export default function Register() {
  return (
    <Suspense fallback={<Loader />}>
      <RegisterForm />
    </Suspense>
  );
}
