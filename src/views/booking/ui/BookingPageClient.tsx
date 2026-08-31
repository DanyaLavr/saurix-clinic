"use client";

import SelectDoctor from "@/src/features/booking/ui/SelectDoctor";
import SelectService from "@/src/features/booking/ui/SelectService";
import Stepper from "@/src/shared/ui/Stepper";
import { useState } from "react";
import SelectDate from "@/src/features/booking/ui/SelectDate";
import Tips from "@/src/features/booking/ui/Tips";
import { IDoctor } from "@/types/doctors";
import ClientBackButton from "@/src/shared/ui/ClientBackButton";

const steps = ["Доктор", "Процедура", "Дата"];
interface IProps {
  initialDoctors: IDoctor[];
}
const BookingPageClient = ({ initialDoctors }: IProps) => {
  const [step, setStep] = useState(0);
  return (
    <main className="flex-1 bg-amber-50">
      <section className="max-w-2xl mx-auto px-4 py-10">
        <ClientBackButton />
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-amber-900">
            Запись к врачу
          </h1>
          <p className="text-sm text-amber-700 mt-1">
            Выберите специалиста, процедуру и удобное время
          </p>
        </div>

        <Stepper
          current={step}
          steps={steps}
          setStep={(step) => setStep(step)}
        />

        <div className="bg-white border border-amber-100 rounded-2xl p-6 shadow-sm">
          <Tips step={step} setStep={setStep} />

          {step === 0 && (
            <SelectDoctor
              initialDoctors={initialDoctors}
              toNextStep={() => setStep(1)}
            />
          )}
          {step === 1 && <SelectService toNextStep={() => setStep(2)} />}
          {step === 2 && <SelectDate />}
        </div>
      </section>
    </main>
  );
};

export default BookingPageClient;
