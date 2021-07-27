import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: "k-class",
  onClick: jest.fn(),
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("test Button components", () => {
  it("should render the correct default button", function () {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    const element = wrapper.getByText("Nice");
    expect(element).toBeTruthy();
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it("should render the correct component based on different props", function () {
    const wrapper = render(<Button {...testProps}>Nice</Button>);
    const element = wrapper.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn-primary btn-lg k-class");
    expect(element.disabled).not.toBeTruthy();
  });
  it("should render a link when btnTypes equals link and href is provided", function () {
    const wrapper = render(
      <Button btnType={ButtonType.Link} href={"http://baidu.com"}>
        Link
      </Button>
    );
    const element = wrapper.getByText("Link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link");
    expect(element).not.toBeDisabled();
  });
  it("should render disabled button when disabled set to true", function () {
    const wrapper = render(<Button {...disabledProps}>Disabled</Button>);
    const element = wrapper.getByText("Disabled") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
  it("should render disabled link  when disabled set to true", function () {
    const wrapper = render(
      <Button
        btnType={ButtonType.Link}
        href={"http.baidu.com"}
        disabled
        style={{ display: "none", backgroundColor: "red" }}
      >
        Disabled Link
      </Button>
    );
    const element = wrapper.getByText("Disabled Link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("disabled");
    expect(element).toHaveStyle({ display: "none", backgroundColor: "red" });
  });
});
