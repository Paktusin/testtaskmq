import { useData } from "./useData";
import { ItemData } from "../types";

const TEMPERATURE = "temperature";

export function useTemperatures() {
  const temperature = useData<ItemData>(TEMPERATURE);
}
