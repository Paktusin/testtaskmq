import React, { PropsWithChildren, useCallback } from "react";

export interface SelectItem {
  label: React.ReactNode;
  value: any;
}

export interface SelectProps {
  items: SelectItem[];
  value?: any;
  onChange?: (value?: any, index?: number, item?: SelectItem) => void;
}

export const Select: React.FC<SelectProps> = ({ items, value, onChange }) => {
  const onSelectChange = useCallback((event: any) => {
    const item = items[event.target.value];
    onChange && onChange(item.value, +event.target.value, item);
  }, []);
  return (
    <select onChange={onSelectChange}>
      {items.map((item, index) => (
        <option key={item.value} value={index} selected={item.value === value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};
