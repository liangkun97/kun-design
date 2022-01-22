import React from "react";
import { render, cleanup } from "@testing-library/react";
import Avatar, { AvatarSize } from "../index";

describe("test Avatar component", () => {
  it("should render default avatar", () => {
    const wrapper = render(<Avatar username="kun" data-testid="avatar-div" />);
    expect(wrapper).toMatchSnapshot();
    const div = wrapper.getByTestId("avatar-div");
    expect(div).toBeInTheDocument();
    const username = wrapper.getByText("k");
    expect(username).toBeTruthy();
  });
  it("should render correct size", () => {
    let wrapper = render(<Avatar data-testid="avatar-div" />);
    let div = wrapper.getByTestId("avatar-div");
    expect(div).toHaveStyle(`height:${AvatarSize.medium}px`);
    expect(div).toHaveStyle(`width:${AvatarSize.medium}px`);
    expect(div).toHaveStyle(`line-height:${AvatarSize.medium}px`);
    let username = wrapper.getByTestId("avatar-div");
    expect(username).toHaveStyle(`line-height:${AvatarSize.medium}px`);
    cleanup();
    wrapper = render(<Avatar size="large" data-testid="avatar-div" />);
    expect(wrapper).toMatchSnapshot();
    div = wrapper.getByTestId("avatar-div");
    expect(div).toHaveStyle(`height:${AvatarSize.large}px`);
    expect(div).toHaveStyle(`width:${AvatarSize.large}px`);
    expect(div).toHaveStyle(`line-height:${AvatarSize.large}px`);
    username = wrapper.getByTestId("avatar-div");
    expect(username).toHaveStyle(`line-height:${AvatarSize.large}px`);
    cleanup();
    wrapper = render(<Avatar size="small" data-testid="avatar-div" />);
    div = wrapper.getByTestId("avatar-div");
    expect(div).toHaveStyle(`height:${AvatarSize.small}px`);
    expect(div).toHaveStyle(`width:${AvatarSize.small}px`);
    expect(div).toHaveStyle(`line-height:${AvatarSize.small}px`);
    username = wrapper.getByTestId("avatar-div");
    expect(username).toHaveStyle(`line-height:${AvatarSize.small}px`);
    cleanup();
    wrapper = render(<Avatar size="tiny" data-testid="avatar-div" />);
    div = wrapper.getByTestId("avatar-div");
    expect(div).toHaveStyle(`height:${AvatarSize.tiny}px`);
    expect(div).toHaveStyle(`width:${AvatarSize.tiny}px`);
    expect(div).toHaveStyle(`line-height:${AvatarSize.tiny}px`);
    username = wrapper.getByTestId("avatar-div");
    expect(username).toHaveStyle(`line-height:${AvatarSize.tiny}px`);
    cleanup();
    wrapper = render(<Avatar size="medium" data-testid="avatar-div" />);
    div = wrapper.getByTestId("avatar-div");
    expect(div).toHaveStyle(`height:${AvatarSize.medium}px`);
    expect(div).toHaveStyle(`width:${AvatarSize.medium}px`);
    expect(div).toHaveStyle(`line-height:${AvatarSize.medium}px`);
    username = wrapper.getByTestId("avatar-div");
    expect(username).toHaveStyle(`line-height:${AvatarSize.medium}px`);
  });
  it("should correct loading", () => {
    let wrapper = render(<Avatar isLoading data-testid="avatar-div" />);
    expect(wrapper).toMatchSnapshot();
    let svg = wrapper.getByTestId("avatar-div");
    expect(svg).toBeVisible();
    cleanup();
    wrapper = render(
      <Avatar
        isLoading
        username="123"
        src="/"
        size="tiny"
        data-testid="avatar-div"
      />
    );
    svg = wrapper.getByTestId("avatar-div");
    expect(svg).toBeVisible();
  });
  it("should correct img", () => {
    let wrapper = render(
      <Avatar src="www.test.com" data-testid="avatar-div" />
    );
    let img = wrapper.getByTestId("avatar-img");
    expect(img.tagName).toEqual("IMG");
    expect(img).toHaveStyle("width:100%");
    expect(img).toHaveAttribute("src", "www.test.com");
    expect(img).toHaveAttribute("alt", "loading");
    cleanup();
    wrapper = render(
      <Avatar
        src="www.liang-kun.cn"
        username="liang-kun"
        data-testid="avatar-div"
      />
    );
    img = wrapper.getByTestId("avatar-img");
    expect(img).toHaveAttribute("src", "www.liang-kun.cn");
    expect(img).toHaveAttribute("alt", "liang-kun");
  });
  it("should render correct username", () => {
    let wrapper = render(
      <Avatar username="liang-kun" data-testid="avatar-div" />
    );
    expect(wrapper).toMatchSnapshot();
    const div = wrapper.getByTestId("avatar-div");
    expect(div).toHaveStyle("text-transform:uppercase");
    let username = wrapper.getByText("l");
    expect(username).toBeVisible();
    cleanup();
    wrapper = render(<Avatar username="中文汉字" data-testid="avatar-div" />);
    username = wrapper.getByText("中");
    expect(username).toBeTruthy();
  });
});
