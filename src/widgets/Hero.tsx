import { Link } from "@/i18n/navigation";
import { ROUTES } from "../shared/config/routes";

const Hero = () => {
  return (
    <section className="bg-amber-50">
      <div className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-800">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Integris Clinic · Аликанте
        </span>

        <h1 className="mt-6 text-3xl font-bold leading-tight text-stone-900 sm:text-5xl">
          Медицинская помощь в Аликанте,{" "}
          <span className="text-amber-800">на вашем языке</span>
        </h1>

        <p className="mt-4 text-base text-stone-600 sm:text-lg">
          Многопрофильная клиника с опытными врачами и индивидуальным подходом к
          каждому пациенту.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={ROUTES.booking}
            className="btn-primary rounded-xl px-6 py-3 text-sm sm:text-base"
          >
            Записаться на приём
          </Link>

          <a
            href="#services"
            className="btn-secondary rounded-xl px-6 py-3 text-sm sm:text-base"
          >
            Наши направления
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
