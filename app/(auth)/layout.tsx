import type { Metadata } from "next";
import "../globals.css";
import SlidingBar from "@/src/shared/ui/SlidingBar";
import { TabContent } from "@/types/auth";
import { ROUTES } from "@/src/shared/config/routes";

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
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <main className="min-h-screen bg-amber-50">
          <div className="max-w-2xl mx-auto px-4 py-10">
            <button>Back</button>
          </div>
          <section className="max-w-2xl mx-auto px-4 py-10 bg-white border border-amber-100 rounded-2xl p-6 shadow-sm">
            <SlidingBar leftContent={login} rightContent={register} />
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
