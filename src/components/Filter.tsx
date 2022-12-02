import React, { PropsWithChildren } from "react";

export interface FilterProps extends PropsWithChildren {}

export const Filter: React.FC<FilterProps> = ({ children }) => {
  return <div>Filter</div>;
};
