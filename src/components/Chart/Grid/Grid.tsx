import clsx from "clsx";
import React, { PropsWithChildren, useMemo } from "react";
import { RangeProps } from "../useRanges";
import styles from "./Grid.module.css";

export interface GridProps extends PropsWithChildren {
  labelXCount?: number;
  labelYCount?: number;
  range: RangeProps;
}

export const Grid: React.FC<GridProps> = ({
  children,
  labelXCount = 5,
  labelYCount = 6,
  range,
}) => {
  const xLabels = useMemo(
    () =>
      getLabels(range.minX, range.maxX, labelXCount).map((n) =>
        new Date(Math.floor(n)).toDateString()
      ),
    [range]
  );
  const yLabels = useMemo(
    () =>
      getLabels(range.minY, range.maxY, labelYCount).map((n) => n.toFixed(2)),
    [range]
  );
  return (
    <div className={clsx(styles.grid)}>
      <div className={clsx(styles.ord, styles.x)}>
        {xLabels.map((l) => (
          <span>{l}</span>
        ))}
      </div>
      <div className={clsx(styles.ord, styles.y)}>
        {yLabels.map((l) => (
          <span>{l}</span>
        ))}
      </div>
      {children}
    </div>
  );
};

function getLabels(min: number, max: number, count: number) {
  return [
    min,
    ...Array(count)
      .fill(null)
      .map((_, index) => min + ((index + 1) * (max - min)) / count),
  ];
}
