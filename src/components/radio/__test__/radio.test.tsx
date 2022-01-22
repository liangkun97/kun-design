import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Radio from "../index";
import { color, typography } from "../../../shared/styles";

const testfn = jest.fn();
const disablefn = jest.fn();

describe("test Radio component", () => {
  it("should checked when clicked", () => {
    const wrapper = render(<Radio label="test" onChange={testfn} />);
    expect(wrapper).toMatchSnapshot();
    const input = wrapper.container.querySelector("input");
    expect(testfn).not.toHaveBeenCalled();
    fireEvent.click(input);
    expect(testfn).toHaveBeenCalled();
  });

  it("shoule render extra text", () => {
    const wrapper = render(
      <Radio
        label="test"
        error="errortext"
        description="description"
        onChange={testfn}
      />
    );
    expect(wrapper).toMatchSnapshot();
    const errortext = wrapper.getByText("errortext");
    expect(errortext).toHaveStyle(`color: ${color.negative}`);
    const description = wrapper.getByText("description");
    expect(description).toHaveStyle(`color:${color.mediumdark}`);
  });
  it("should hide label", () => {
    const wrapper = render(<Radio label="test" hideLabel></Radio>);
    expect(wrapper).toMatchSnapshot();
    const text = wrapper.getByText("test");
    expect(text).toHaveStyle("clip-path: inset(100%)");
  });
  it("should disabled", () => {
    const wrapper = render(
      <Radio label="test" disabled onChange={disablefn}></Radio>
    );
    expect(wrapper).toMatchSnapshot();
    const text = wrapper.getByText("test");
    fireEvent.click(text);
    expect(disablefn).not.toHaveBeenCalled();
  });
});
