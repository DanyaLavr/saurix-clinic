import { calendar_v3 } from "googleapis";

export interface IDoctor {
  id: string;
  name: string;
  specialty: string;
  isActive: boolean;
}

export interface IUser {
  id: string;
  email: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
  doctorId?: string;
  patientId?: string;
}

export interface IServiceWithNumberPrice {
  id: string;
  name: string;
  durationMinutes: number;
  description: string | null;
  price: number;
  isActive: boolean;
}
export interface ISlot {
  date: Date;
  isAvailable: boolean;
}
export type TFreeBusy = calendar_v3.Schema$TimePeriod;
