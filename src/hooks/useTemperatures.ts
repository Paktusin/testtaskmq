import { useData } from "./useData";
import { ItemData } from "../types";
import { temperatureService } from "../db/db";
import { tables } from "../tables";

export function useTemperatures() {
  return useData<ItemData>(
    temperatureService,
    `../data/${tables.temparatures}.json`
  );
}
