import React from "react";
import Icon from "./icon";
import { storiesOf } from "@storybook/react";

const dogIcon = () => (
  <div>
    <Icon icon={"dog"} theme={"danger"} />
    <Icon icon={"dog"} />
  </div>
);

storiesOf("Icon Components", module).add("Icon图标", dogIcon);
