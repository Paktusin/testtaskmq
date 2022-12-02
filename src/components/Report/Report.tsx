import React, { useMemo } from "react";
import { useTemperatures } from "../../hooks/useTemperatures";
import { Histogram } from "../Chart/Chart";
import { Filter } from "../Filter";
import { Menu } from "../Menu";

export function Report() {
  const { data: temps, loading } = useTemperatures();
  const chartData = useMemo(
    () => [
      {
        color: "red",
        data: temps.map((i) => ({ value: i.v, time: new Date(i.t).valueOf() })),
      },
    ],
    [temps]
  );
  return (
    <div>
      <h2>Архив метеослужбы</h2>
      <div>
        <Menu></Menu>
        <div>
          <Filter></Filter>
          <Histogram loading={loading} data={chartData}></Histogram>
        </div>
      </div>
    </div>
  );
}
