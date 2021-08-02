import React from "react";
import { render, fireEvent, RenderResult } from "@testing-library/react";
import Tabs, { TabsProps } from "./tabs";
import TabsItem from "./tabsItem";

const defaultProps: TabsProps = {
  defaultIndex: 0,
  className: "test-tabs-nav",
  onSelect: jest.fn(),
};

const createStyleFile = () => {
  const css = `
  .tabs-content {
    display: none;
  }
  .tabs-content.tabs-content-active{
     display: block;
   }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = css;
  return style;
};

const generate = (props: TabsProps) => {
  return (
    <Tabs {...props} data-testid={"tabs-test"}>
      <TabsItem label="card1">this is content one</TabsItem>
      <TabsItem label="card2">this is content two</TabsItem>
      <TabsItem label="disabled" disabled={true}>
        this is content three
      </TabsItem>
    </Tabs>
  );
};
let wrapper: RenderResult,
  card1El: HTMLElement,
  card2El: HTMLElement,
  disabledElement: HTMLElement;
describe("test Tabs and TabsItem Component", () => {
  beforeEach(() => {
    wrapper = render(generate(defaultProps));
    wrapper.container.appendChild(createStyleFile());
    card1El = wrapper.getByText("card1");
    card2El = wrapper.getByText("card2");
    disabledElement = wrapper.getByText("disabled");
  });
  it("should render correct Tabs and TabsItem in default props", function () {
    expect(wrapper.container.querySelector(".tabs-nav")).toHaveClass(
      "tabs-nav tabs-underline"
    );
    expect(card1El).toBeInTheDocument();
    expect(card1El).toHaveClass("tabs-label tabs-label-active");
    expect(card2El).toHaveClass("tabs-label");
    expect(disabledElement).toHaveClass("tabs-label tabs-label-disabled");

    expect(wrapper.getByText("this is content one")).toBeVisible();

    fireEvent.click(card1El);
    expect(defaultProps.onSelect).toHaveBeenCalledWith(0);

    fireEvent.click(card2El);
    expect(defaultProps.onSelect).toHaveBeenLastCalledWith(1);
    expect(card1El).not.toHaveClass("tabs-label-active");
    expect(card2El).toHaveClass("tabs-label-active");
    expect(wrapper.getByText("this is content one")).not.toBeVisible();
    expect(wrapper.getByText("this is content two")).toBeVisible();

    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("tabs-label-active");
    expect(wrapper.getByText("this is content three")).not.toBeVisible();
  });
});
