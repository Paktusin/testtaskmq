import { useState, useEffect } from "react";
import { getData } from "./utils";
import type { ItemData } from "./types";
import { Menu } from "./components/Menu";
import { Filter } from "./components/Filter";
import { Chart } from "./components/Chart";
import { useData } from "./hooks/useData";
import { useTemperatures } from "./hooks/useTemperature";

function App() {
  const temperatures = useTemperatures();

  // useEffect(() => {
  //     (async () => {
  //         setTemperature(await getData<ItemData>('../data/temperature.json'));
  //         setPrecipitation(await getData<ItemData>('../data/precipitation.json'));
  //     })();
  // }, []);

  return (
    <div>
      <h2>Архив метеослужбы</h2>
      <Menu></Menu>
      <Filter></Filter>
      <Chart></Chart>
    </div>
  );
}

export default App;
