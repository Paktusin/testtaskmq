import React, { PropsWithChildren, useContext, useState } from "react";
import { StoreContenxt } from "../hooks/useStore";
import { YearSelect } from "./YearSelect";

export interface FilterProps extends PropsWithChildren {}

export const Filter: React.FC<FilterProps> = ({ children }) => {
  const { state, dispatch } = useContext(StoreContenxt);
  const { from, to } = state?.filter!;
  return (
    <div style={{ display: "flex", marginBottom: 4 }}>
      <YearSelect
        value={from}
        onChange={(value) => dispatch({ type: "from", payload: value })}
      />
      <YearSelect
        value={to}
        onChange={(value) => dispatch({ type: "to", payload: value })}
      />
    </div>
  );
};
