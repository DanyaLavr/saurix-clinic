"use client";
import { ROUTES } from "@/src/shared/config/routes";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const ErrorPageClient = () => {
  const t = useTranslations("submit-booking.error");
  return (
    <main className="flex-1 bg-amber-50 flex items-center justify-center px-4">
      <section className="bg-white max-w-2xl mx-auto pb-10 rounded-2xl shadow-sm text-center">
        <div className="mx-auto mb-5 flex h-14 w-full items-center justify-center rounded-t-2xl bg-amber-100">
          <svg
            className="h-7 w-7 text-amber-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0 3.75h.008M10.29 3.86l-8.08 14a2 2 0 001.73 3h16.12a2 2 0 001.73-3l-8.08-14a2 2 0 00-3.46 0z"
            />
          </svg>
        </div>
        <div className="px-4">
          <h2 className="text-xl font-semibold text-gray-900">{t("title")}</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            {t("description")}
          </p>

          <div className="mt-6">
            <Link
              href={ROUTES.login}
              className="flex w-full items-center justify-center rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-600 active:bg-amber-700"
            >
              {t("loginButton")}
            </Link>
          </div>

          {/* <p className="mt-4 text-xs text-gray-400">{t("footer")}</p> */}
        </div>
      </section>
    </main>
  );
};

export default ErrorPageClient;
