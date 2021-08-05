import React, {
  FunctionComponentElement,
  useContext,
  useState,
  cloneElement,
  MouseEvent,
} from "react";
import classnames from "classnames";
import { MenuContext } from "./menu";
import Icon from "../Icon/icon";
import { MenuItemProps } from "./menuItem";
import Transition from "../Transition/transition";

export interface SubMenuProps {
  title: string;
  index?: string;
  className?: string;
  defaultOpenSubMenus?: [];
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const context = useContext(MenuContext);
  const { title, index, className, children } = props;
  const openSubMenus = context.defaultOpenSubMenus as Array<string>;

  const isOpen =
    index && context.mode === "vertical" ? openSubMenus.includes(index) : false;

  const [menuOpen, setOpen] = useState<boolean>(isOpen);
  const classes = classnames("menu-item submenu-item", className, {
    "is-active": context.index.split("-")[0] === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: MouseEvent, toggle: boolean) => {
    e.preventDefault();
    clearTimeout(timer);
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 250);
  };
  /**
   *  垂直布局鼠标点击打开subMenu
   */
  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};

  /**
   *  水平布局鼠标移动打开subMenu
   */
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  const renderChildren = () => {
    const subMenuClasses = classnames("submenu", {
      "menu-opened": menuOpen,
    });

    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return cloneElement(childElement, { index: `${index}-${i}` });
      } else {
        console.error(
          "Warning:  Menu has a child which is not a MenuItem component"
        );
      }
    });
    return (
      <Transition in={menuOpen} timeout={300} animation={"zoom-in-top"}>
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className={"arrow-icon"} />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
