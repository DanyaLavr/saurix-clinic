import { Link } from "@/i18n/navigation";
import { ROUTES } from "../shared/config/routes";

const STATS = [
  { value: "18+", label: "врачей на платформе" },
  { value: "12", label: "направлений приёма" },
  { value: "<60 сек", label: "чтобы выбрать время" },
] as const;

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-amber-50">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-amber-100/70 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center lg:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-800">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Онлайн-запись · Saurix Clinic
        </span>

        <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-stone-900 sm:text-5xl lg:text-[3.4rem]">
          Врач, услуга, время —{" "}
          <span className="text-amber-800">и вы записаны</span>.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
          Saurix Clinic собирает расписания всех докторов в одном месте.
          Выберите специалиста и услугу, посмотрите свободные слоты в реальном
          времени и подтвердите приём за минуту — без звонков администратору.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={ROUTES.booking}
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 shadow-lg shadow-amber-900/10"
          >
            Записаться на приём
            <svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <a
            href="#how-it-works"
            className="btn-secondary inline-flex items-center rounded-xl px-6 py-3.5"
          >
            Как это работает
          </a>
        </div>

        <dl className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-amber-200/70 pt-8">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="text-2xl font-bold text-stone-900">{value}</dd>
              <dd className="text-sm text-stone-500">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Hero;
