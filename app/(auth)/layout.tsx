import type { Metadata } from "next";
import SlidingBar from "@/src/shared/ui/SlidingBar";
import { TabContent } from "@/types/auth";
import { ROUTES } from "@/src/shared/config/routes";
import GoogleButton from "@/src/shared/ui/GoogleButton";
import { Suspense } from "react";
import Loader from "@/src/shared/ui/Loader";

export const metadata: Metadata = {
  title: {
    default: "Вход и регистрация",
    template: "%s | Моя клиника",
  },
  description:
    "Войдите в аккаунт или зарегистрируйтесь, чтобы записаться к врачу онлайн",
  robots: {
    index: false,
    follow: false,
  },
};

const login: TabContent = {
  text: "Login",
  path: ROUTES.login,
};
const register: TabContent = {
  text: "Register",
  path: ROUTES.register,
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-amber-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <button>Back</button>
      </div>
      <section className="max-w-2xl mx-auto px-4 py-10 bg-white border border-amber-100 rounded-2xl p-6 shadow-sm">
        <SlidingBar leftContent={login} rightContent={register} />
        {children}
        <div className="flex items-center gap-3 my-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">или</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <Suspense fallback={<Loader />}>
          <GoogleButton />
        </Suspense>
      </section>
    </main>
  );
}
