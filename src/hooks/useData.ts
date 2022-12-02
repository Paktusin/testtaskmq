import { useContext, useEffect, useState } from "react";
import { DataService } from "../db/db";
import { ItemData } from "../types";
import { getData } from "../utils";
import { StoreContenxt, useStore } from "./useStore";

export function useData<T extends ItemData>(
  service: DataService<T>,
  url: string
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const { state } = useContext(StoreContenxt);
  const fromStr = `${state.filter.from}-01-01`;
  const toStr = `${state.filter.to + 1}-01-01`;
  console.log(data, fromStr, toStr);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const count = await service.count();
      if (!count) {
        const backendData = await getData<T>(url);
        for (let row of backendData) {
          await service.put(row.t, row);
        }
      } else {
        setData(await service.bound(fromStr, toStr));
      }
      setLoading(false);
    })();
  }, []);

  return { data, loading };
}
