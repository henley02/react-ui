import React from "react";
import { storiesOf } from "@storybook/react";
import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
import { action } from "@storybook/addon-actions";

export const defaultMenu = () => (
  <Menu defaultIndex={"0"} onSelect={action("点击了")}>
    <MenuItem>Menu 1</MenuItem>
    <MenuItem>Menu 2</MenuItem>
    <SubMenu title={"drop menu"}>
      <MenuItem>dropdown 1</MenuItem>
      <MenuItem>dropdown 2</MenuItem>
      <MenuItem>dropdown 3</MenuItem>
    </SubMenu>
    <MenuItem disabled>disabled</MenuItem>
  </Menu>
);
const verticalMenu = () => (
  <Menu
    defaultIndex={"0"}
    onSelect={action("点击了")}
    mode={"vertical"}
    defaultOpenSubMenus={["2"]}
  >
    <MenuItem>Menu 1</MenuItem>
    <MenuItem>Menu 2</MenuItem>
    <SubMenu title={"drop menu"}>
      <MenuItem>dropdown 1</MenuItem>
      <MenuItem>dropdown 2</MenuItem>
      <MenuItem>dropdown 3</MenuItem>
    </SubMenu>
    <MenuItem disabled>disabled</MenuItem>
  </Menu>
);
storiesOf("Menu Component", module)
  .add("default Menu", defaultMenu)
  .add("vertical Menu", verticalMenu);
