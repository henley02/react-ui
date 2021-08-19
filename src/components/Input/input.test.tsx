import { render, fireEvent } from "@testing-library/react";

import Input, { InputProps } from "./input";

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: "test-input",
};

describe("test Input Components", () => {
  it("should render the correct default Input", function () {
    const wrapper = render(<Input {...defaultProps} />);
    const testNode = wrapper.getByPlaceholderText(
      "test-input"
    ) as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass("input-inner");
    fireEvent.change(testNode, { target: { value: "123" } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testNode.value).toEqual("123");
  });
  it("should render the disabled Input", function () {
    const wrapper = render(<Input disabled placeholder={"disabled"} />);
    const testNode = wrapper.getByPlaceholderText(
      "disabled"
    ) as HTMLInputElement;
    expect(testNode.disabled).toBeTruthy();
  });
  it("should render different input sizes  on size property", function () {
    const wrapper = render(<Input size={"lg"} placeholder={"size"} />);
    const testContainer = wrapper.container.querySelector(".input-wrapper");
    expect(testContainer).toHaveClass("input-size-lg");
  });
  it("should render icon element on icon property", function () {
    const wrapper = render(<Input placeholder={"icon"} icon={"columns"} />);
    const testNode = wrapper.getByPlaceholderText("icon");
    expect(
      wrapper.container.querySelector(".icon-wrapper")
    ).toBeInTheDocument();
  });
  it("should render prepend  and  append element on  prepend/append property", function () {
    const wrapper = render(
      <Input prepend={"https://"} append={".com"} placeholder={"pend"} />
    );
    const testContainer = wrapper.container.querySelector(".input-wrapper");
    expect(testContainer).toHaveClass(
      "input-group input-group-append  input-group-prepend"
    );
    expect(wrapper.queryByText("https://")).toBeInTheDocument();
    expect(wrapper.queryByText(".com")).toBeInTheDocument();
  });
});
