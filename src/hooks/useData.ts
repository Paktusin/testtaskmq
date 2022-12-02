import { useEffect, useState } from "react";
import { DataService } from "../db/db";
import { ItemData } from "../types";
import { getData } from "../utils";

export function useData<T extends ItemData>(
  service: DataService<T>,
  url: string
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const count = await service.count();
      if (!count) {
        const backendData = await getData<T>(url);
        setData(backendData);
        for (let row of backendData) {
          await service.put(row.t, row);
        }
      }
    })();
  }, []);

  return { data, loading };
}
