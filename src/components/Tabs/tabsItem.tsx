import React, { FC } from "react";
import classnames from "classnames";

export interface TabsItemProps {
  /** Tab选项上的文字 */
  label: string;
  /** tab的classname */
  className?: string;
  /** tab选项是否被激活 */
  isActive?: boolean;
  /** tab选项是否被禁用 */
  disabled?: boolean;
}

export const TabsItem: FC<TabsItemProps> = (props) => {
  const { label, className, isActive, children } = props;
  const classes = classnames("tabs-content", className, {
    "tabs-content-active": isActive,
  });
  return (
    <div key={label} className={classes}>
      {children}
    </div>
  );
};

TabsItem.defaultProps = {
  isActive: false,
  disabled: false,
};
export default TabsItem;
