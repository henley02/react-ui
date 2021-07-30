import React from "react";
import {
  render,
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react";

import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};
const testVerticalProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};
const testVerticalOpenProps: MenuProps = {
  mode: "vertical",
  defaultIndex: "0",
  defaultOpenSubMenus: ["4"],
};
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props} data-testid={"test-menu"}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>dropdown-1</MenuItem>
        <MenuItem>dropdown-2</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>opened1</MenuItem>
      </SubMenu>
    </Menu>
  );
};
const createStyleFile = () => {
  const cssFile: string = `
    .viking-submenu {
      display: none;
    }
    .viking-submenu.menu-opened {
      display:block;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult,
  wrapper2: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disableElement: HTMLElement;

describe("test Menu and MenuItem  Component in  default mode:horizontal", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disableElement = wrapper.getByText("disabled");
  });

  it("should render  correct Menu and MenuItem based on default props", function () {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu test");
    // expect(menuElement.getElementsByTagName("li").length).toEqual(6);
    expect(menuElement.querySelectorAll(":scope >li").length).toEqual(5);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disableElement).toHaveClass("menu-item is-disabled");
  });

  it("click items should change active and call  the right callback", function () {
    const thirdItem = wrapper.getByText("xyz");
    fireEvent.click(thirdItem);
    expect(activeElement).not.toHaveClass("is-active");
    expect(thirdItem).toHaveClass("menu-item is-active");
    expect(testProps.onSelect).toHaveBeenLastCalledWith("2");
    fireEvent.click(disableElement);
    expect(disableElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenLastCalledWith(1);
  });

  it("should show dropdown items when hover on subMenu", async () => {
    expect(wrapper.queryByText("dropdown-1")).not.toBeInTheDocument();
    const dropDownElement = wrapper.getByText("dropdown");
    expect(dropDownElement).toBeInTheDocument();

    fireEvent.mouseEnter(dropDownElement);
    await waitFor(() => {
      expect(wrapper.queryByText("dropdown-1")).toBeVisible();
    });

    fireEvent.click(wrapper.getByText("dropdown-1"));
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0");

    fireEvent.mouseLeave(dropDownElement);
    await waitFor(() => {
      expect(wrapper.queryByText("dropdown-1")).not.toBeInTheDocument();
    });
  });
});
describe("test Menu and MenuItem component  in vertical mode", () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerticalOpenProps));
    wrapper2.container.append(createStyleFile());
  });
  it("should render vertical mode  when mode  is  set to vertical", function () {
    const menuElement = wrapper2.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu menu-vertical");
  });

  it("should show dropdown items when click on subMenu for vertical mode", async () => {
    const dropDownItem = wrapper2.queryByText("dropdown-1");
    expect(dropDownItem).not.toBeInTheDocument();
    fireEvent.click(wrapper2.getByText("dropdown"));
    expect(dropDownItem).not.toBeInTheDocument();
  });

  it("should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index", () => {
    expect(wrapper2.queryByText("opened1")).toBeVisible();
  });
});
