import { useCallback, useContext, useEffect, useState } from "react";
import { ItemData } from "../types";
import { getData } from "../utils";
import { StoreContenxt } from "./useStore";

export function useData() {
  const [data, setData] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(false);
  const { state } = useContext(StoreContenxt);
  const { filter, type } = state;

  useEffect(() => {
    fetchData();
  }, [filter, type]);

  const fetchData = useCallback(async () => {
    setData([]);

    const url = `../data/${type}.json`;
    const res: ItemData[] = (await getData(url)) as any;
    setData(
      res.filter((item) => {
        const year = new Date(item.t).getFullYear();
        return filter.from <= year && filter.to >= year;
      })
    );
    setLoading(false);
  }, [filter, type]);

  return { data, loading };
}
