import { createContext, Reducer, useReducer } from "react";
import { MAX_YEAR, MIN_YEAR } from "../components/YearSelect";

export interface StoreProps {
  filter: { from: number; to: number };
  showTemp: boolean;
  showPrec: boolean;
}

function init() {
  return {
    filter: { from: MIN_YEAR, to: MAX_YEAR },
    showTemp: true,
    showPrec: false,
  };
}

const reducer: Reducer<StoreProps, { type: string; payload: any }> = (
  state,
  action
) => {
  switch (action.type) {
    case "from":
      return { ...state, filter: { ...state.filter, from: action.payload } };
    case "to":
      return { ...state, filter: { ...state.filter, to: action.payload } };

  }
  return state;
};

export function useStore() {
  return useReducer(reducer, undefined, init);
}

export interface StoreContenxtProps {
  state: StoreProps;
  dispatch: (action: { type: string; payload: any }) => void;
}

export const StoreContenxt = createContext<StoreContenxtProps>({} as any);
