import React, { PropsWithChildren, useEffect, useRef } from "react";
import { ItemData } from "../../types";
import styles from "./Chart.module.css";
import { draw } from "./draw";

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
  useEffect(() => {
    if (ref.current) {
      draw(data, ref.current);
    }
  }, [data]);
  return (
    <div
      className={styles.chart}
      style={{ cursor: loading ? "progress" : undefined }}
    >
      <canvas height={284} width={431} ref={ref}></canvas>
    </div>
  );
};
