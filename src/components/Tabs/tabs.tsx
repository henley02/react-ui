import React, {
  FC,
  useState,
  FunctionComponentElement,
  cloneElement,
} from "react";
import classnames from "classnames";
import { TabsItemProps } from "./tabsItem";

type TabStyle = "underline" | "outline";

export interface TabsProps {
  /** 默认active的菜单项索引值 */
  defaultIndex?: number;
  /** 设置 Tabs 样式 */
  styleType?: TabStyle;
  /** 点击Tab时触发的回调函数 */
  onSelect?: (selectedIndex: number) => void;
  /** Tabs的className */
  className?: string;
}

export const Tabs: FC<TabsProps> = (props) => {
  const {
    defaultIndex,
    styleType,
    onSelect,
    className,
    children,
    ...restProps
  } = props;
  const classes = classnames("tabs-nav", className, {
    "tabs-underline": styleType === "underline",
    "tabs-outline": styleType === "outline",
  });

  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  function handleClick(index: number, disabled: boolean = false): void {
    if (disabled) {
      return;
    }
    setActiveIndex(index);
    if (typeof onSelect === "function") {
      onSelect(index);
    }
  }

  return (
    <div {...restProps}>
      <nav className={classes}>
        <ul className="tabs-ul">
          {React.Children.map(children, (child, index) => {
            const childElement =
              child as FunctionComponentElement<TabsItemProps>;
            const itemLabelClasses = classnames("tabs-label", {
              "tabs-label-active": activeIndex === index,
              "tabs-label-disabled": childElement.props.disabled,
            });
            return (
              <li
                key={index}
                className={itemLabelClasses}
                onClick={() => handleClick(index, childElement.props.disabled)}
              >
                {childElement.props.label}
              </li>
            );
          })}
        </ul>
      </nav>
      {React.Children.map(children, (child, index) => {
        const childElement = child as FunctionComponentElement<TabsItemProps>;
        return cloneElement(childElement, { isActive: activeIndex === index });
      })}
    </div>
  );
};

Tabs.defaultProps = {
  defaultIndex: 0,
  styleType: "underline",
};
export default Tabs;
