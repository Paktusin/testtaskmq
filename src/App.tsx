import type { ItemData } from "./types";
import { Menu } from "./components/Menu";
import { Filter } from "./components/Filter";
import { Chart } from "./components/Chart";
import { useTemperatures } from "./hooks/useTemperatures";
import { usePrecipitations } from "./hooks/usePrecipitations";

function App() {
  const { data: temeratures, loading: tLoading } = useTemperatures();
  const { data: precipitations, loading: pLoading } = usePrecipitations();

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
