import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "./button";

const buttonWithSize = () => (
  <div>
    <Button size={"lg"}>large button</Button>
    <Button size={"sm"}>small button</Button>
  </div>
);
const buttonWithType = () => (
  <div>
    <Button onClick={action("clicked")}>default button</Button>
    <Button btnType="primary">primary button</Button>
    <Button btnType="danger">danger button</Button>
    <Button btnType="link" href="http://baidu.com">
      link button
    </Button>
  </div>
);

const buttonWithDisabled = () => (
  <div>
    <Button btnType="primary" disabled>
      disabled primary button
    </Button>
    <Button btnType="link" href="http://baidu.com" disabled>
      disabled link button
    </Button>
  </div>
);

storiesOf("Button Component", module)
  .add("不同类型 Button", buttonWithType)
  .add("不同尺寸的 Button", buttonWithSize)
  .add("不能点击 Button", buttonWithDisabled);
