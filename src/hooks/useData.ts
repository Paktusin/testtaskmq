import { useEffect, useState } from "react";
import { connect } from "../db/db";
import { ItemData } from "../types";
import { getData } from "../utils";

export function useData<T>(name: string) {
  const [data, setData] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const res = await get<T>(name)
  });

  return { data, loading };
}
