import React, { PropsWithChildren, useEffect, useRef } from "react";
import styles from "./Histogram.module.css";
import { draw } from "./draw";
import { Grid } from "./Grid";
import { useRanges } from "./useRanges";

export interface ChartData<T> {
  data: T[];
  color: string;
}

export interface ChartProps<T> extends PropsWithChildren {
  data: ChartData<T>[];
  loading: boolean;
}

export interface HistogramData {
  time: number;
  value: number;
}

export const Histogram: React.FC<ChartProps<HistogramData>> = ({
  data,
  loading,
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const range = useRanges(data, "time");
  useEffect(() => {
    if (ref.current) {
      draw(data, ref.current, range);
    }
  }, [data]);
  return (
    <div
      className={styles.chart}
      style={{ cursor: loading ? "wait" : undefined }}
    >
      <Grid range={range}>
        <canvas height={284} width={431} ref={ref}></canvas>
      </Grid>
    </div>
  );
};
