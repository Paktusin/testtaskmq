import { useContext, useMemo } from "react";
import { useData } from "../../hooks/useData";
import { StoreContenxt } from "../../hooks/useStore";
import { tables } from "../../tables";
import { Histogram } from "../Chart/Histrogram/Histogram";
import { Filter } from "../Filter";
import { Menu } from "../Menu/Menu";
import styles from "./Report.module.css";

export function Report() {
  const { state } = useContext(StoreContenxt);
  const { data } = useData();
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
    <div className={styles.report}>
      <h2>Архив метеослужбы</h2>
      <div className={styles.body}>
        <Menu></Menu>
        <div>
          <Filter></Filter>
          <Histogram data={chartData}></Histogram>
        </div>
      </div>
    </div>
  );
}
