import React, { PropsWithChildren } from "react";

export interface ButtonProps extends PropsWithChildren {}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};
