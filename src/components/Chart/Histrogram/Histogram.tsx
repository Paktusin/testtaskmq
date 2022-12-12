import React, { PropsWithChildren, useEffect, useRef } from "react";
import { draw } from "../draw";
import { Grid } from "../Grid/Grid";
import { useRanges } from "../useRanges";
import styles from "./Histogram.module.css";

export interface ChartData<T> {
  data: T[];
  color: string;
}

export interface ChartProps<T> extends PropsWithChildren {
  data: ChartData<T>[];
}

export interface HistogramData {
  time: number;
  value: number;
}

export const Histogram: React.FC<ChartProps<HistogramData>> = ({ data }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const range = useRanges(data, "time");
  useEffect(() => {
    if (ref.current) {
      draw(data, ref.current, range);
    }
  }, [data]);
  return (
    <div className={styles.chart}>
      <Grid range={range}>
        <canvas height={284} width={700} ref={ref}></canvas>
      </Grid>
    </div>
  );
};
