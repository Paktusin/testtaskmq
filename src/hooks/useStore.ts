import { createContext, Reducer, useReducer } from "react";
import { MAX_YEAR, MIN_YEAR } from "../components/YearSelect";
import { tables } from "../tables";

export interface StoreProps {
  filter: { from: number; to: number };
  type: string;
}

function init() {
  return {
    filter: { from: MIN_YEAR, to: MIN_YEAR },
    type: tables.temparatures,
  };
}

const reducer: Reducer<StoreProps, { type: string; payload?: any }> = (
  state,
  action
) => {
  switch (action.type) {
    case "kind":
      return { ...state, type: action.payload };
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
  dispatch: (action: { type: string; payload?: any }) => void;
}

export const StoreContenxt = createContext<StoreContenxtProps>({} as any);
