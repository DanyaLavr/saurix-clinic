import { getServerSession } from "next-auth";
import { authConfig } from "../shared/config/authConfig";
import { Link } from "@/i18n/navigation";

import { ROUTES } from "../shared/config/routes";
import { LogoutButton } from "../shared/ui/LogoutButton";
import { getTranslations } from "next-intl/server";

type NavItem = {
  title: string;
  description?: string;
};

type NavGroup = {
  label: string;
  href: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: "О клинике",
    href: "",
    items: [
      { title: "Наша история", description: "15 лет практики в Аликанте" },
      {
        title: "Лицензии и сертификаты",
        description: "Аккредитация испанского Минздрава",
      },
      { title: "Отзывы пациентов", description: "Реальные истории и оценки" },
      {
        title: "Команда клиники",
        description: "18+ врачей разных специализаций",
      },
    ],
  },
  {
    label: "Процедуры",
    href: "",
    items: [
      { title: "Терапия", description: "Диагностика и лечение заболеваний" },
      { title: "Кардиология", description: "ЭКГ, УЗИ сердца" },
      { title: "Гинекология", description: "Осмотры и ведение беременности" },
      { title: "Педиатрия", description: "Приём детей от рождения" },
      { title: "Стоматология", description: "Лечение и имплантация" },
      { title: "Дерматология", description: "Диагностика кожи, косметология" },
    ],
  },
  {
    label: "Врачи",
    href: "",
    items: [
      { title: "Мария Гонсалес", description: "Терапевт · 12 лет практики" },
      { title: "Хавьер Родригес", description: "Кардиолог · 18 лет практики" },
      { title: "Елена Соколова", description: "Гинеколог · 9 лет практики" },
      { title: "Карлос Мартинес", description: "Педиатр · 15 лет практики" },
    ],
  },
  {
    label: "Кабинеты",
    href: "",
    items: [
      {
        title: "Терапевтический кабинет",
        description: "Первичный приём и диагностика",
      },
      { title: "Кабинет УЗИ", description: "Ультразвуковая диагностика" },
      { title: "Процедурный кабинет", description: "Инъекции, забор анализов" },
      {
        title: "Стоматологический кабинет",
        description: "Лечение и гигиена полости рта",
      },
    ],
  },
  {
    label: "Техника",
    href: "",
    items: [
      { title: "УЗИ-аппараты", description: "Диагностика экспертного класса" },
      { title: "ЭКГ-оборудование", description: "Кардиологический мониторинг" },
      {
        title: "Лабораторный комплекс",
        description: "Анализы в день обращения",
      },
      {
        title: "Стоматологические установки",
        description: "Современное оборудование",
      },
    ],
  },
  {
    label: "Наши плюсы",
    href: "",
    items: [
      { title: "Приём в день обращения", description: "Без долгого ожидания" },
      {
        title: "Врачи говорят по-русски",
        description: "И на испанском, английском",
      },
      {
        title: "Работаем со страховыми",
        description: "Основные компании Испании",
      },
      { title: "Прозрачные цены", description: "Без скрытых доплат" },
    ],
  },
  {
    label: "Доп. услуги",
    href: "",
    items: [
      { title: "Вызов врача на дом", description: "В пределах Аликанте" },
      {
        title: "Справки и заключения",
        description: "Для работы, учёбы, спорта",
      },
      { title: "Второе мнение врача", description: "Консультация по диагнозу" },
      { title: "Чек-апы", description: "Комплексное обследование" },
    ],
  },
];

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

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_GROUPS.map(({ label, href, items }) => (
            <div key={label} className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900"
              >
                {label}
                <svg
                  className="h-3 w-3 transition-transform group-hover:rotate-180"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="invisible absolute left-0 top-full w-64 pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white p-2 shadow-xl shadow-stone-900/5">
                  {items.map(({ title, description }) => (
                    <Link
                      key={title}
                      href={href}
                      className="block rounded-xl px-3 py-2 transition-colors hover:bg-amber-50"
                    >
                      <p className="text-sm font-semibold text-stone-900">
                        {title}
                      </p>
                      {description && (
                        <p className="mt-0.5 text-xs leading-snug text-stone-500">
                          {description}
                        </p>
                      )}
                    </Link>
                  ))}

                  <Link
                    href={href}
                    className="mt-1 block rounded-xl px-3 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-50"
                  >
                    Смотреть всё →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </nav>

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
