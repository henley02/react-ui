import React, { useContext } from "react";
import classnames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  /** 设置MenuItem 的索引值 */
  index?: string;
  /** 设置 MenuItem 的禁用 */
  disabled?: boolean;
  /** 设置MenuItem 的属性名 */
  className?: string;
  /** 设置MenuItem 的样式 */
  style?: React.CSSProperties;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
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
