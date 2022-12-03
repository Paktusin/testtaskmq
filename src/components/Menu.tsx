import React, { PropsWithChildren, useContext } from "react";
import { StoreContenxt } from "../hooks/useStore";
import { tables } from "../tables";
import { Button } from "./Button/Button";

export interface MenuProps extends PropsWithChildren {}

export const Menu: React.FC<MenuProps> = ({ children }) => {
  const { state, dispatch } = useContext(StoreContenxt);
  return (
    <div>
      <Button
        active={state.type === tables.temparatures}
        onClick={() => dispatch({ type: "kind", payload: tables.temparatures })}
      >
        Температура
      </Button>
      <Button
        active={state.type === tables.precipitation}
        onClick={() =>
          dispatch({ type: "kind", payload: tables.precipitation })
        }
      >
        Осадки
      </Button>
    </div>
  );
};
