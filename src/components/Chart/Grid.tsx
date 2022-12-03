import React, { PropsWithChildren } from "react";
import { RangeProps } from "./useRanges";

export interface GridProps extends PropsWithChildren {
  labelXCount?: number;
  labelYCount?: number;
  range: RangeProps;
}

export const Grid: React.FC<GridProps> = ({
  children,
  labelXCount = 5,
  labelYCount = 5,
  range,
}) => {
  const xLabels = getLabels(range.minX, range.maxX, labelXCount).map((n) =>
    new Date(Math.floor(n)).toDateString()
  );
  const yLabels = getLabels(range.minY, range.maxY, labelYCount).map((n) =>
    n.toFixed(2)
  );
  return <div>{children}</div>;
};

function getLabels(min: number, max: number, count: number) {
  return [
    min,
    ...Array(count)
      .fill(null)
      .map((_, index) => min + ((index + 1) * (max - min)) / count),
  ];
}
