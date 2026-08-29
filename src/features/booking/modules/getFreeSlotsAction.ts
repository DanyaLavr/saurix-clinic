"use server";

import { IGetFreeSlotsParams } from "../types/props";
import { getFreeSlots } from "./getFreeSlots";

const getFreeSlotsAction = async (params: IGetFreeSlotsParams) => {
  return getFreeSlots(params);
};

export default getFreeSlotsAction;
