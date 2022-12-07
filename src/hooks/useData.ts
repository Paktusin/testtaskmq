import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  precipitationService,
  temperatureService,
  updateService,
} from "../db/db";
import { tables } from "../tables";
import { ItemData } from "../types";
import { StoreContenxt } from "./useStore";

export function useData() {
  const cache = useRef(new Map<string, ItemData[]>());
  const { state } = useContext(StoreContenxt);
  const { filter, type } = state;
  const [allData, setData] = useState<ItemData[]>([]);

  const setDataAndCache = (data: ItemData[]) => {
    cache.current.set(type, data);
    setData(data);
  };

  useEffect(() => {
    if (cache.current.has(type)) {
      return setData(cache.current.get(type)!);
    }
    const ctrl = new AbortController();
    updateService.get(type).then((updated) => {
      if (!updated) {
        const url = `../data/${type}.json`;
        fetch(url, { signal: ctrl.signal })
          .then((res) => res.json())
          .then((data) => {
            setDataAndCache(data);
            cacheToDB(type, data);
          });
      } else {
        const service =
          type === tables.temparatures
            ? temperatureService
            : precipitationService;
        service.all().then(setDataAndCache);
      }
    });
    return () => ctrl.abort();
  }, [type]);

  const data = useMemo(() => {
    const { from, to } = filter;
    return allData.filter((row) => {
      const year = new Date(row.t).getFullYear();
      return from <= year && to >= year;
    });
  }, [allData, filter]);
  return { data };
}

async function cacheToDB(type: string, data: ItemData[]) {
  const service =
    type === tables.temparatures ? temperatureService : precipitationService;
  for (let row of data) {
    await service.put(row.t, row);
  }
  updateService.put(type, 1);
}
