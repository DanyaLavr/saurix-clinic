"use client";
import { Fragment } from "react";
import useBookingStore from "../store/store";
import { IDoctor } from "@/types/doctors";
import { IToNextStep } from "../types/props";

interface IProps extends IToNextStep {
  initialDoctors: IDoctor[];
}
const SelectDoctor = ({ initialDoctors, toNextStep }: IProps) => {
  const selectedDoctor = useBookingStore((state) => state.selectedDoctor);
  const setSelectedDoctor = useBookingStore((state) => state.setSelectedDoctor);

  return (
    <div className="grid gap-4">
      <input
        type="text"
        className=" w-full border rounded-lg p-2"
        placeholder="Search doctors..."
      />
      <form
        action=""
        className="grid grid-cols-3 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          toNextStep();
        }}
      >
        {initialDoctors.map(({ id, name, specialty }) => (
          <Fragment key={id}>
            <input
              type="radio"
              id={id}
              name="doctor"
              className="hidden"
              checked={selectedDoctor?.id === id}
              onChange={() => {
                setSelectedDoctor(
                  initialDoctors.find((d) => d.id === id) || null,
                );
              }}
            />
            <label
              htmlFor={id}
              className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer ${
                selectedDoctor?.id === id
                  ? "bg-amber-800 text-amber-50 border-amber-800"
                  : "bg-white text-amber-900 border-amber-200 hover:border-amber-400"
              }`}
            >
              {/* <img src="" alt="doctor" /> */}
              <h3>{name}</h3>
              <p>{specialty}</p>
            </label>
          </Fragment>
        ))}
        <button
          type="submit"
          className="mt-4 w-full py-3 bg-amber-800 text-amber-50 rounded-lg font-medium hover:bg-amber-900 transition-colors"
        >
          Select Doctor
        </button>
      </form>
    </div>
  );
};

export default SelectDoctor;
