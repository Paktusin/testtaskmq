import { StoreContenxt, useStore } from "./hooks/useStore";
import { Report } from "./components/Report/Report";

function App() {
  const [state, dispatch] = useStore();
  return (
    <StoreContenxt.Provider value={{ state, dispatch }}>
      <Report />
    </StoreContenxt.Provider>
  );
}

export default App;
