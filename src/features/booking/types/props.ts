export interface IToNextStep {
  toNextStep: () => void;
}
export interface IGetFreeSlotsParams {
  date: string;
  serviceId: string;
  doctorId: string;
}
