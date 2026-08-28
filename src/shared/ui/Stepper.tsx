interface IProps {
  steps: string[];
  current: number;
  setStep: (step: number) => void;
}
const Stepper = ({ steps, current, setStep }: IProps) => {
  return (
    <div className="flex items-start w-full mb-8">
      {steps.map((label, index) => {
        const isDone = index < current;
        const isActive = index === current;

        return (
          <div className="flex flex-col items-center flex-1 gap-2" key={index}>
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                text-sm font-medium transition-all duration-300 
                ${
                  isDone
                    ? "bg-amber-50 border border-amber-200 text-amber-700 cursor-pointer"
                    : isActive
                      ? "bg-white border-2 border-amber-400 text-amber-700 ring-4 ring-amber-50"
                      : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
                }
              `}
              onClick={index <= current ? () => setStep(index) : undefined}
            >
              {index + 1}
            </div>

            <span
              className={`text-xs whitespace-nowrap transition-colors duration-300 ${
                isDone
                  ? "text-amber-600 font-medium cursor-pointer"
                  : isActive
                    ? "text-amber-900 font-medium"
                    : "text-gray-400 cursor-not-allowed"
              }`}
              onClick={index <= current ? () => setStep(index) : undefined}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default Stepper;
