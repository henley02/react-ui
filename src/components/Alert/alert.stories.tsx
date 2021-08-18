import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import Alert from "./alert";

const alertWithType = () => (
  <div>
    <Alert type={"success"} title={"success Alert"} />
    <Alert title={"default Alert"} onClose={action("关闭")} />
    <Alert type={"warning"} title={"warning Alert"} />
    <Alert type={"danger"} title={"danger Alert"} />
  </div>
);

const alertWithoutClose = () => (
  <div>
    <Alert title={"without close Alert"} closable={false} />
    <Alert title={"custom close Alert"} customClose={"关闭"} />
  </div>
);

storiesOf("Alert Component", module)
  .add("不同类型的Alert", alertWithType)
  .add("不同关闭按钮的Alert", alertWithoutClose);
