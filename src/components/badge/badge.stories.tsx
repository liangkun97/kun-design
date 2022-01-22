import React from "react";
import Icon from "../icon";
import Badge, { badgeColor, BadgeProps } from "./index";
import {
  withKnobs,
  text,
  boolean,
  color,
  select,
} from "@storybook/addon-knobs";

export default {
  title: "数据展示 /Badge",
  component: "Badge",
  decorators: [withKnobs],
};

type selectType = "positive" | "negative" | "neutral" | "warning" | "error";

export const knobsBadge = () => {
  return (
    <Badge
      status={select<BadgeProps["status"]>(
        "status",
        Object.keys(badgeColor) as selectType[],
        "negative"
      )}
    >
      {text("children", "badge")}
    </Badge>
  );
};

export const all = () => (
  <div>
    <Badge status="positive">Positive</Badge>
    <Badge status="negative">Negative</Badge>
    <Badge status="neutral">Neutral</Badge>
    <Badge status="error">Error</Badge>
    <Badge status="warning">Warning</Badge>
  </div>
);

export const withIcon = () => (
  <Badge status="warning">
    <Icon icon="check" />
    with icon
  </Badge>
);
