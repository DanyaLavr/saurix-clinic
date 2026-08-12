import type { Metadata } from "next";
import SlidingBar from "@/src/shared/ui/SlidingBar";
import { TabContent } from "@/types/auth";
import { ROUTES } from "@/src/shared/config/routes";
import GoogleButton from "@/src/shared/ui/GoogleButton";
import { Suspense } from "react";
import Loader from "@/src/shared/ui/Loader";
import ServerBackLink from "@/src/shared/ui/ServerBackLink";

export const metadata: Metadata = {
  title: {
    default: "Вход и регистрация",
    template: "%s | Saurix Clinic",
  },
  description:
    "Войдите в аккаунт или зарегистрируйтесь, чтобы записаться к врачу онлайн",
  robots: {
    index: false,
    follow: false,
  },
};

const login: TabContent = {
  text: "Вход",
  path: ROUTES.login,
};
const register: TabContent = {
  text: "Регистрация",
  path: ROUTES.register,
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-amber-50">
      <div className="mx-auto max-w-2xl px-4 pt-10">
        <ServerBackLink />
      </div>

      <section className="mx-auto max-w-2xl px-4 py-10">
        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm sm:p-8">
          <SlidingBar leftContent={login} rightContent={register} />
          {children}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-stone-200" />
            <span className="text-xs text-stone-400">или</span>
            <div className="h-px flex-1 bg-stone-200" />
          </div>
          <Suspense fallback={<Loader />}>
            <GoogleButton />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
