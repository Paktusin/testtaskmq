import React, { PropsWithChildren } from "react";

export interface ChartProps extends PropsWithChildren {}

export const Chart: React.FC<ChartProps> = ({ children }) => {
  return <div>Chart</div>;
};
