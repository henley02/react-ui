import React from "react";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import Alert, { AlertProps } from "./alert";

const testProps: AlertProps = {
  type: "primary",
  title: "Test Alert",
  customClose: "关闭",
  closable: true,
};

const testSuccessAlertProp: AlertProps = {
  closable: true,
  customClose: "关闭",
  type: "success",
};

describe("test Alert Component", () => {
  it("should render the correct default Alert", async function () {
    const wrapper = render(<Alert {...testProps}>Nice</Alert>);
    const element = wrapper.queryByText("Nice");

    expect(element).toBeInTheDocument();
    expect(element?.tagName).toEqual("P");
    expect(element).toHaveClass("alert-message");
    expect(element?.parentNode).toHaveClass("alert alert-primary");
    expect(element?.parentElement?.tagName).toEqual("DIV");

    const titleElement = wrapper.queryByText("Test Alert");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("alert-title");
    expect(titleElement?.parentNode).toBe(element?.parentNode);

    const iconElement = wrapper.queryByText("关闭") as HTMLElement;
    expect(iconElement).toBeInTheDocument();

    fireEvent.click(iconElement);
    await (() => {
      expect(element).not.toBeInTheDocument();
    });
  });

  it("should render the correct component based on different props", async function () {
    cleanup();
    const wrapper = render(<Alert {...testSuccessAlertProp}>Nice</Alert>);
    const element = wrapper.queryByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element?.tagName).toEqual("P");
    expect(element).toHaveClass("alert-message");
    expect(element?.parentNode).toHaveClass("alert alert-success");

    const iconElement = wrapper.queryByText("关闭") as HTMLElement;
    expect(iconElement).toBeInTheDocument();

    fireEvent.click(iconElement);
    await waitFor(() => {
      expect(iconElement).not.toBeInTheDocument();
      expect(element).not.toBeInTheDocument();
    });
  });
});
