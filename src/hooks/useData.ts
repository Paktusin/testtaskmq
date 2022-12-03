import { useContext, useEffect, useState } from "react";
import { DataService } from "../db/db";
import { ItemData } from "../types";
import { getData } from "../utils";
import { StoreContenxt } from "./useStore";

export function useData<T extends ItemData>(
  service: DataService<T>,
  url: string
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { state } = useContext(StoreContenxt);
  const { filter } = state;

  useEffect(() => {
    fetchData(filter.from, filter.to);
  }, [filter]);

  async function fetchData(from: number, to: number) {
    const count = await service.count();
    if (!count) {
      setLoading(true);
      const backendData = await getData<T>(url);
      const size = backendData.length;
      let count = 0;
      for (let row of backendData) {
        await service.put(row.t, row);
        count++;
        setProgress(Math.floor((count / size) * 100));
      }
    }
    const fromStr = `${state.filter.from}-01-01`;
    const toStr = `${state.filter.to}-01-01`;
    setData(await service.bound(fromStr, toStr));
    setLoading(false);
  }

  return { data, loading, progress };
}
