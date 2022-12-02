import React, { PropsWithChildren } from "react";
import { Button } from "./Button";

export interface MenuProps extends PropsWithChildren {}

export const Menu: React.FC<MenuProps> = ({ children }) => {
  return (
    <div>
      <Button>Температура</Button>
      <Button>Осадки</Button>
    </div>
  );
};
