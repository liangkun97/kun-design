import React from "react";
import { render, cleanup } from "@testing-library/react";
import Icon, { IconProps } from "../index";
import { icons } from "../../../shared/icons";

function IconTest(icon: IconProps["icon"]) {
  const wrapper = render(<Icon icon={"mobile"} data-testid="icon-path" />);
  const path = wrapper.queryByTestId("icon-path").firstElementChild;
  expect(path).toHaveAttribute("d", icons["mobile"]);
  cleanup();
}

describe("test Icon component", () => {
  it("should render correct icon", () => {
    Object.keys(icons).forEach((key) => {
      IconTest(key as IconProps["icon"]);
    });
  });
  it("should render block", () => {
    const wrapper = render(<Icon icon="mobile" data-testid="icon-path" />);
    const path = wrapper.queryByTestId("icon-path");
    expect(path).toHaveStyle("display:inline-block");
  });
  it("should render correct color", () => {
    let wrapper = render(<Icon icon="mobile" data-testid="icon-path" />);
    let path = wrapper.queryByTestId("icon-path");
    expect(path).toHaveAttribute("color", "black");
    cleanup();
    wrapper = render(
      <Icon icon="mobile" color="blue" data-testid="icon-path" />
    );
    path = wrapper.queryByTestId("icon-path");
    expect(path).toHaveAttribute("color", "blue");
  });
});
