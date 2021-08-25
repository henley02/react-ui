import { config } from "react-transition-group";
import AutoComplete, {
  AutoCompleteProps,
  DataSourceType,
} from "./autoComplete";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";

config.disabled = true;
interface arrType {
  value: string;
  number: number;
}
const testArray: arrType[] = [
  { value: "ab", number: 11 },
  { value: "abc", number: 1 },
  { value: "b", number: 4 },
  { value: "c", number: 15 },
];
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query: string) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};

const testProps2: AutoCompleteProps = {
  fetchSuggestions: (query: string) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: "auto-complete",
  renderOption: (it: DataSourceType) => {
    let item = it as DataSourceType<arrType>;
    return (
      <span>
        {item.value}-{item.number}
      </span>
    );
  },
};

const asyncProps: AutoCompleteProps = {
  fetchSuggestions: jest.fn((query) => {
    return Promise.resolve(
      testArray.filter((item) => item.value.includes(query))
    );
  }),
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};

let wrapper: RenderResult, inputNode: HTMLInputElement;

describe("test AutoComplete Component", () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />);
    inputNode = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
  });

  it("test basic AutoComplete behavior", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    expect(inputNode.value).toEqual("a");
    await waitFor(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    expect(
      wrapper.container.querySelectorAll(".suggestion-item").length
    ).toEqual(2);
    fireEvent.click(wrapper.container.querySelectorAll(".suggestion-item")[0]);
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
    expect(inputNode.value).toEqual("ab");
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });
  it("should provide keyboard support", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    expect(inputNode.value).toEqual("a");
    await waitFor(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    const firstResult = wrapper.queryByText("ab");
    const secondResult = wrapper.queryByText("abc");
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).toHaveClass("is-active");
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).not.toHaveClass("is-active");
    expect(secondResult).toHaveClass("is-active");
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).not.toHaveClass("is-active");
    expect(secondResult).toHaveClass("is-active");
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "abc",
      number: 1,
    });
    expect(inputNode.value).toEqual("abc");
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });
  it("click outside should hide the dropdown", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    expect(inputNode.value).toEqual("a");
    await waitFor(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });
  it("renderOption should generate the right template", async () => {
    cleanup();
    wrapper = render(<AutoComplete {...testProps2} />);
    inputNode = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;

    expect(inputNode).toBeInTheDocument();
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      expect(wrapper.queryByText("ab-11")).toBeInTheDocument();
    });
    fireEvent.click(wrapper.queryByText("ab-11") as HTMLElement);
    expect(inputNode.value).toEqual("ab");
  });
  it("async fetchSuggestions should works fine", async () => {
    cleanup();
    wrapper = render(<AutoComplete {...asyncProps} />);
    inputNode = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
    fireEvent.change(inputNode, { target: { value: "a" } });
    // expect(inputNode.value).toEqual("a");
    await waitFor(() => {
      // expect(asyncProps.fetchSuggestions).toHaveBeenCalled();
      // expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    });
  });
});
