import React, { PropsWithChildren } from "react";
import { Select, SelectItem, SelectProps } from "./Select/Select";

export interface YearSelectProps extends Omit<SelectProps, "items"> {}

export const MAX_YEAR = 2006;
export const MIN_YEAR = 1881;

const years = Array(MAX_YEAR - MIN_YEAR + 1)
  .fill(null)
  .map(
    (_, index) =>
      ({
        value: MIN_YEAR + index,
        label: MIN_YEAR + index + "",
      } as SelectItem)
  );

export const YearSelect: React.FC<YearSelectProps> = ({ ...props }) => {
  return <Select items={years} {...props} />;
};
