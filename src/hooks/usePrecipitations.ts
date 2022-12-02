import { useData } from "./useData";
import { ItemData } from "../types";
import { precipitationService } from "../db/db";
import { tables } from "../tables";

export function usePrecipitations() {
  return useData<ItemData>(
    precipitationService,
    `../data/${tables.precipitation}.json`
  );
}
