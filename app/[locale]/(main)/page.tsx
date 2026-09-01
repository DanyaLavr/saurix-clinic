import Hero from "@/src/widgets/Hero";

const PROCEDURES = [
  {
    title: "Терапия",
    description:
      "Диагностика, лечение и профилактика широкого спектра заболеваний.",
    icon: "🩺",
  },
  {
    title: "Кардиология",
    description:
      "ЭКГ, УЗИ сердца, консультации по профилактике сердечно-сосудистых заболеваний.",
    icon: "❤️",
  },
  {
    title: "Гинекология",
    description: "Плановые осмотры, УЗИ, ведение беременности и консультации.",
    icon: "🌸",
  },
  {
    title: "Педиатрия",
    description: "Осмотры, вакцинация и лечение детей от рождения до 18 лет.",
    icon: "🧸",
  },
  {
    title: "Стоматология",
    description: "Лечение, гигиена полости рта, консультации по имплантации.",
    icon: "🦷",
  },
  {
    title: "Дерматология",
    description: "Диагностика кожных заболеваний, косметологические процедуры.",
    icon: "✨",
  },
] as const;
const DOCTORS = [
  {
    name: "Мария Гонсалес",
    role: "Терапевт",
    experience: "12 лет практики",
    languages: "Испанский, английский, русский",
  },
  {
    name: "Хавьер Родригес",
    role: "Кардиолог",
    experience: "18 лет практики",
    languages: "Испанский, английский",
  },
  {
    name: "Елена Соколова",
    role: "Гинеколог",
    experience: "9 лет практики",
    languages: "Русский, испанский",
  },
  {
    name: "Карлос Мартинес",
    role: "Педиатр",
    experience: "15 лет практики",
    languages: "Испанский, английский",
  },
] as const;

export default function Home() {
  return (
    <main>
      <Hero />
      <section id="services" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-800">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Направления
            </span>
            <h2 className="mt-6 text-3xl font-bold text-stone-900 sm:text-4xl">
              Чем мы можем помочь
            </h2>
            <p className="mt-4 text-base text-stone-600 sm:text-lg">
              Полный спектр медицинских услуг под одной крышей — от первичного
              приёма до узкой специализации.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCEDURES.map(({ title, description, icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-amber-100 bg-amber-50/50 p-6 text-left transition hover:border-amber-200 hover:bg-amber-50"
              >
                <span className="text-2xl">{icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-stone-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="doctors" className="bg-amber-50 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-800">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Наши врачи
            </span>
            <h2 className="mt-6 text-3xl font-bold text-stone-900 sm:text-4xl">
              Специалисты, которым доверяют
            </h2>
            <p className="mt-4 text-base text-stone-600 sm:text-lg">
              Опытные врачи с международной практикой, говорящие на вашем языке.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DOCTORS.map(({ name, role, experience, languages }) => (
              <div
                key={name}
                className="rounded-2xl border border-amber-200 bg-white p-6 text-left shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-800">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="mt-4 text-base font-semibold text-stone-900">
                  {name}
                </h3>
                <p className="text-sm font-medium text-amber-800">{role}</p>
                <p className="mt-3 text-sm text-stone-600">{experience}</p>
                <p className="mt-1 text-sm text-stone-500">{languages}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
