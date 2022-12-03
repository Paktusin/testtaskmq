import { useMemo } from "react";
import { ChartData } from "./Histogram";

export interface RangeProps {
  maxX: number;
  minX: number;
  maxY: number;
  minY: number;
}

export function useRanges(
  charData: ChartData<any>[],
  xkey = "name",
  yKey = "value"
) {
  return useMemo(() => {
    const data = charData.reduce(
      (arr, cData) => arr.concat(cData.data),
      [] as any[]
    );
    let maxX = (data[0] && data[0][xkey]) ?? 0,
      minX = (data[0] && data[0][xkey]) ?? 0,
      maxY = (data[0] && data[0][yKey]) ?? 0,
      minY = (data[0] && data[0][yKey]) ?? 0;
    for (let item of data) {
      if (item[xkey] > maxX) {
        maxX = item[xkey];
      }
      if (item[xkey] < minX) {
        minX = item[xkey];
      }
      if (item[yKey] > maxY) {
        maxY = item[yKey];
      }
      if (item[yKey] < minY) {
        minY = item[yKey];
      }
    }
    return { maxX, minX, maxY, minY };
  }, [charData]);
}
