import React, { FC, useState } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

export type AlertType = "success" | "primary" | "warning" | "danger";
export interface AlertProps {
  /**
   * 文字内容
   */
  title?: string;
  /**
   * 是否显示关闭按钮
   */
  closable?: boolean;
  /**
   * 自定义关闭按钮
   */
  customClose?: string;
  /**
   * 点击关闭按钮的回调
   */
  onClose?: () => void;
  /**
   * 类型
   */
  type?: AlertType;
}

export const Alert: FC<AlertProps> = (props) => {
  const {
    title,
    closable,
    type,
    customClose,
    onClose,
    children,
    ...restProps
  } = props;
  const [visible, setVisible] = useState(true);

  const customCloseP = customClose || (
    <Icon icon={"times"} className={"window-close"} size={"lg"} />
  );

  const classes = classnames("alert", {
    [`alert-${type}`]: type,
  });

  const handleClick = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Transition
      in={visible}
      animation="zoom-in-left"
      timeout={300}
      wrapper={true}
    >
      <div className={classes} {...restProps}>
        {title ? <h4 className={"alert-title"}>{title}</h4> : null}
        <p className="alert-message">{children}</p>
        {closable ? <i onClick={handleClick}>{customCloseP}</i> : null}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  type: "primary",
  closable: true,
};

export default Alert;
