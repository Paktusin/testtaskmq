import React, { PropsWithChildren } from "react";

export interface MenuProps extends PropsWithChildren {}

export const Menu: React.FC<MenuProps> = ({ children }) => {
  return <div>Menu</div>;
};
