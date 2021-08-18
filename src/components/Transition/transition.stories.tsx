import React from "react";
import Transition from "./transition";
import { storiesOf } from "@storybook/react";

const defaultTransition = () => (
  <div>
    <Transition in={true} timeout={400} animation={"zoom-in-left"}>
      <div>出现</div>
    </Transition>
  </div>
);

storiesOf("Transition Components", module).add(
  "default transition",
  defaultTransition
);
