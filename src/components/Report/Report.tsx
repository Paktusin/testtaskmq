import { useContext, useMemo } from "react";
import { useData } from "../../hooks/useData";
import { StoreContenxt } from "../../hooks/useStore";
import { tables } from "../../tables";
import { Histogram } from "../Chart/Histrogram/Histogram";
import { Filter } from "../Filter";
import { Menu } from "../Menu";

export function Report() {
  const { state } = useContext(StoreContenxt);
  const { data, loading } = useData();
  const chartData = useMemo(
    () => [
      {
        color: state.type === tables.temparatures ? "red" : "blue",
        data: data.map((i) => ({ value: i.v, time: new Date(i.t).valueOf() })),
      },
    ],
    [data]
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
