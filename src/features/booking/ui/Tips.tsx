import useBookingStore from "../store/store";
interface IProps {
  step: number;
  setStep: (step: number) => void;
}
const Tips = ({ step, setStep }: IProps) => {
  const selectedDoctor = useBookingStore((state) => state.selectedDoctor);
  const selectedService = useBookingStore((state) => state.selectedService);

  const titles = [
    "Выберите врача",
    "Выберите процедуру",
    "Выберите дату и время",
  ];
  return (
    <div className="mb-4">
      <h2 className="text-lg font-medium text-amber-900">{titles[step]}</h2>

      {step > 0 && selectedDoctor && (
        <div className="flex gap-2 mt-2 text-sm text-amber-600">
          <span
            onClick={() => setStep(0)}
            className="cursor-pointer hover:text-amber-900 transition-colors"
          >
            {selectedDoctor.name}
          </span>
          {step > 1 && selectedService && (
            <>
              <span className="text-amber-300">·</span>
              <span
                onClick={() => setStep(1)}
                className="cursor-pointer hover:text-amber-900 transition-colors"
              >
                {selectedService.name}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Tips;
