import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useMemo,
} from "react";
import styled, { css } from "styled-components";
import { color, background, typography } from "../../shared/styles";
import { darken, rgba, opacify } from "polished";
import { easing } from "../../shared/animation";

export const badgeColor = {
  positive: color.positive,
  negative: color.negative,
  neutral: color.dark,
  warning: color.warning,
  error: color.lightest,
};

export const badgeBackground = {
  positive: background.positive,
  negative: background.negative,
  neutral: color.mediumlight,
  warning: background.warning,
  error: color.negative,
};

const BadgeWrapper = styled.div<BadgeProps>`
  display: inline-block;
  vertical-align: top;
  font-size: 11px;
  line-height: 12px;
  padding: 4px 12px;
  border-radius: 3em;
  font-weight: ${typography.weight.bold};

  svg {
    height: 12px;
    width: 12px;
    margin-right: 4px;
    margin-top: -2px;
  }

  ${(props) =>
    props.status === "positive" &&
    css`
      color: ${badgeColor.positive};
      background: ${badgeBackground.positive};
    `};

  ${(props) =>
    props.status === "negative" &&
    css`
      color: ${badgeColor.negative};
      background: ${badgeBackground.negative};
    `};

  ${(props) =>
    props.status === "warning" &&
    css`
      color: ${badgeColor.warning};
      background: ${badgeBackground.warning};
    `};

  ${(props) =>
    props.status === "error" &&
    css`
      color: ${badgeColor.error};
      background: ${badgeBackground.error};
    `};

  ${(props) =>
    props.status === "neutral" &&
    css`
      color: ${badgeColor.neutral};
      background: ${badgeBackground.neutral};
    `};
`;

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  status?: "positive" | "negative" | "neutral" | "warning" | "error";
}

function Badge(props: PropsWithChildren<BadgeProps>) {
  return <BadgeWrapper {...props} />;
}

Badge.defaultProps = {
  status: "negative",
};

export default Badge;
