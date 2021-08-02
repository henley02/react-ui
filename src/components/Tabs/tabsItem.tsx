import React, { FC } from "react";
import classnames from "classnames";

export interface TabsItemProps {
  label: string;
  className?: string;
  isActive?: boolean;
  disabled?: boolean;
}

const TabsItem: FC<TabsItemProps> = (props) => {
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
