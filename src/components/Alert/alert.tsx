import React, { useState } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
export type AlertType = "success" | "primary" | "warning" | "danger";

export interface AlertProps {
  title?: string;
  closable?: boolean;
  customClose?: string;
  onClose?: () => void;
  children?: React.ReactNode;
  type?: AlertType;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { title, closable, type, customClose, onClose, children } = props;
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
      <div className={classes}>
        {title ? <h4 className={"alert-title"}>{title}</h4> : null}
        <p className="alert-message">{children}</p>
        {closable ? <i onClick={handleClick}>{customCloseP}</i> : null}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  type: "primary",
};

export default Alert;
