import { ChangeEvent, FC, InputHTMLAttributes, ReactElement } from "react";
import classnames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";

type SizeType = "lg" | "sm";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /** 设置 Input 禁用 */
  disabled?: boolean;
  /** 设置 Input 大小，支持 lg 或者 sm */
  size?: SizeType;
  /** 设置 Input 自定义类名 */
  className?: string;
  /** 设置 Input 图标，在左侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /** 设置 Input 前缀，用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /** 设置 Input 后缀，用于配置一些固定组合 */
  append?: string | ReactElement;

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    children,
    className,
    style,
    ...restProps
  } = props;
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };

  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }

  const classes = classnames(`input-wrapper`, className, {
    [`input-size-${size}`]: size,
    "input-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  });
  return (
    <div className={classes} style={style}>
      {prepend && <div className="input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input
        type="text"
        className="input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="input-group-append">{append}</div>}
    </div>
  );
};

Input.defaultProps = {
  size: "sm",
};
export default Input;
