import { useCallback, useContext, useEffect, useState } from "react";
import { precipitationService, temperatureService } from "../db/db";
import { tables } from "../tables";
import { ItemData } from "../types";
import { getData } from "../utils";
import { StoreContenxt } from "./useStore";

export function useData() {
  const [data, setData] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { state } = useContext(StoreContenxt);
  const { filter, type } = state;

  useEffect(() => {
    fetchData();
  }, [filter, type]);

  const fetchData = useCallback(async () => {
    setData([]);
    const service =
      type === tables.temparatures ? temperatureService : precipitationService;
    const count = await service.count();
    if (!count) { // если нет данных в базе кешируем
      setLoading(true);
      const url = `../data/${type}.json`;
      const backendData = await getData<ItemData>(url);
      const size = backendData.length;
      let count = 0;
      for (let row of backendData) {
        await service.put(row.t, row);
        count++;
        setProgress(Math.floor((count / size) * 100));
      }
    }
    const fromStr = `${filter.from}-01-01`;
    const toStr = `${filter.to + 1}-01-01`;
    setData(await service.bound(fromStr, toStr));
    setLoading(false);
  }, [filter, type]);

  return { data, loading, progress };
}
