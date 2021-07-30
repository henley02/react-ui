import React, { useContext } from "react";
import classnames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const context = useContext(MenuContext);

  const { index, disabled, className, style, children } = props;
  const classes = classnames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });

  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === "string") {
      context.onSelect(index);
    }
  };
  return (
    <li style={style} className={classes} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
