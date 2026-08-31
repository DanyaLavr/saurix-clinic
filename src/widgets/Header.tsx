import { getServerSession } from "next-auth";
import { authConfig } from "../shared/config/authConfig";
import { Link } from "@/i18n/navigation";

import { ROUTES } from "../shared/config/routes";
import { LogoutButton } from "../shared/ui/LogoutButton";
import { getTranslations } from "next-intl/server";

const Header = async () => {
  const session = await getServerSession(authConfig);
  const t = await getTranslations("header");
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-stone-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-800 text-sm font-bold text-amber-50">
            S
          </span>
          Saurix <span className="font-normal text-stone-400">Clinic</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-stone-600 md:flex"></nav>

        <div className="flex items-center gap-5">
          {session?.user ? (
            <div className="hidden items-center gap-4 sm:flex">
              <Link
                //ROUTES.profile
                href={"/"}
                className="flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-stone-900"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-semibold text-amber-800">
                  {session.user.name?.[0]?.toUpperCase() ?? "?"}
                </span>
                {session.user.name}
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <Link
              href={ROUTES.login}
              className="hidden text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 sm:inline"
            >
              {t("login")}
            </Link>
          )}

          <Link
            href={ROUTES.booking}
            className="btn-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm"
          >
            {t("bookAppointment")}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
