import React from "react";

import Tabs from "./tabs";
import TabsItem from "./tabsItem";
import { storiesOf } from "@storybook/react";

const defaultTabs = () => (
  <Tabs>
    <TabsItem label={"选项卡一"}>content one</TabsItem>
    <TabsItem label={"选项卡二"}>content two</TabsItem>
    <TabsItem label={"选项卡三"} disabled>
      content three
    </TabsItem>
  </Tabs>
);
const outlineTabs = () => (
  <Tabs defaultIndex={1} styleType={"outline"}>
    <TabsItem label={"选项卡一"}>content one</TabsItem>
    <TabsItem label={"选项卡二"}>content two</TabsItem>
    <TabsItem label={"选项卡三"} disabled>
      content three
    </TabsItem>
  </Tabs>
);
storiesOf("Tabs Components", module)
  .add("默认的Tabs", defaultTabs)
  .add("选项卡样式的Tabs", outlineTabs);
