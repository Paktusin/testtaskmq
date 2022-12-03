import clsx from "clsx";
import React, { PropsWithChildren, ReactNode } from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<any> {
  active?: boolean;
  children?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  active,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx({ [styles.active]: active }, styles.button)}
    >
      {children}
    </button>
  );
};
