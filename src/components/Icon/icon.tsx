import React from "react";
import classnames from "classnames";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas);

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface IIconProps extends FontAwesomeIconProps {
  /** 主题 */
  theme?: ThemeProps;
}

export const Icon: React.FC<IIconProps> = (props) => {
  const { className, theme, ...restProps } = props;
  const classes = classnames("icon", className, {
    [`icon-${theme}`]: theme,
  });
  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
