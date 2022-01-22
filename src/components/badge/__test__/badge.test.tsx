import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Badge, { badgeBackground, badgeColor, BadgeProps } from "../index";
import { color, typography } from "../../../shared/styles";

const testonClick = jest.fn();

const testThemeFunc = (status: BadgeProps["status"]) => {
  cleanup();
  const wrapper = render(<Badge status={status}>666</Badge>);
  const text = wrapper.getByText("666");
  expect(text).toHaveStyle(`color: ${badgeColor[status]}`);
  expect(text).toHaveStyle(`background: ${badgeBackground[status]}`);
};

describe("test Badge component", () => {
  it("should render default style", () => {
    const wrapper = render(<Badge>111</Badge>);
    expect(wrapper).toMatchSnapshot();
    const text = wrapper.getByText("111");
    expect(text).toHaveStyle(`color: ${badgeColor.negative}`);
    expect(text).toHaveStyle(`background: ${badgeBackground.negative}`);
  });
  it("should render corrent attr", () => {
    const wrapper = render(
      <Badge className="testclass" onClick={testonClick}>
        attr
      </Badge>
    );
    const text = wrapper.getByText("attr");
    expect(text.className.includes("testclass")).toBeTruthy();
    fireEvent.click(text);
    expect(testonClick).toHaveBeenCalled();
  });
  it("should render corrent theme", () => {
    testThemeFunc("positive");
    testThemeFunc("warning");
    testThemeFunc("negative");
    testThemeFunc("neutral");
    testThemeFunc("error");
  });
});
