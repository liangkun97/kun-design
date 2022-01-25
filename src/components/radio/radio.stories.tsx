import React, { useState } from "react";
import Radio from "./index";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { color } from "../../shared/styles";
import Icon from "../icon";

export default {
  title: "数据录入 /Radio",
  component: "Radio",
  decorators: [withKnobs],
};

const onChange = action("change");

export const knobsRadio = () => {
  return (
    <Radio
      appearance={select<keyof typeof color>(
        "color",
        Object.keys(color) as Array<keyof typeof color>,
        "primary"
      )}
      label={text("label", "radio")}
      onChange={onChange}
      hideLabel={boolean("hodeLabel", false)}
      error={text("error", "")}
      description={text("description", "")}
      disabled={boolean("disabled", false)}
    />
  );
};

export const testColors = () => (
  <div>
    {Object.keys(color).map((v, i) => (
      <Radio
        key={i}
        name="group2"
        label={v}
        appearance={v as keyof typeof color}
      />
    ))}
  </div>
);

export const testOnChange = () => (
  <form>
    <Radio name="group1" label="apple" onChange={onChange} />
    <Radio name="group1" label="banana" onChange={onChange} />
    <Radio name="group1" label="pear" onChange={onChange} />
    <Radio name="group1" label="mongo" onChange={onChange} />
    <Radio name="group1" label="watermelon" onChange={onChange} />
  </form>
);

export const testDisabled = () => <Radio label="disabled" disabled></Radio>;

export const testExtraText = () => (
  <Radio
    label="the radio has extra text"
    error="error text"
    description="description text"
  ></Radio>
);

export const testHideLabel = () => (
  <Radio
    label="the radio has extra text"
    description="label will hidden"
    hideLabel
  ></Radio>
);

export const withIcon = () => (
  <Radio
    label={
      <span>
        <Icon icon="redux"></Icon>with icon
      </span>
    }
  ></Radio>
);

function ParentControl() {
  const [state, setState] = useState(() => new Array(5).fill(false));
  const onClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const target = e.target as HTMLInputElement;
    const index = target.value as unknown as number;
    const newArr = new Array(5).fill(false);
    newArr[index] = true;
    setState(newArr);
  };
  return (
    <div>
      <Radio
        label="apple"
        onClick={onClick}
        value={0}
        checked={state[0]}
        onChange={action(state[0])}
      />
      <Radio
        label="banana"
        onClick={onClick}
        value={1}
        checked={state[1]}
        onChange={action(state[1])}
      />
      <Radio
        label="pear"
        onClick={onClick}
        value={2}
        checked={state[2]}
        onChange={action(state[2])}
      />
      <Radio
        label="mongo"
        onClick={onClick}
        value={3}
        checked={state[3]}
        onChange={action(state[3])}
      />
      <Radio
        label="watermelon"
        onClick={onClick}
        value={4}
        checked={state[4]}
        onChange={action(state[4])}
      />
    </div>
  );
}

export const testParentControl = () => <ParentControl></ParentControl>;